const graphql = require('graphql');
const _ = require('lodash');
const traveler1 = require('../models/TravelerSignUpSchema');
const owner1 = require('../models/OwnerSignupSchema');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;




const TravelerType = new GraphQLObjectType({
    name: 'Traveler',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})


const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        traveler: {
            type: TravelerType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                //
            }
        },
        owner: {
            type: OwnerType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                //
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation', //used in exports
    fields: {
        addTraveler: {
            type: TravelerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                //new traveler creation with imported travelerschema.
                let traveler = new traveler1({ //dont use same names
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return traveler.save(); //after saving to db we want to return saved details instead of null so return is used.
            }
        },
        addOwner: {
            type: OwnerType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                //new traveler creation with imported travelerschema.
                let owner = new owner1({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                return owner.save(); //after saving to db we want to return saved details instead of null so return is used.
            }
        },

    }
})



module.exports = new GraphQLSchema({
    //query and mutation are predefined, must be used as it is (as per my observation)//
    query: Query,
    mutation: Mutation,
});