const graphql = require('graphql');
const _ = require('lodash');
const traveler1 = require('../models/TravelerSignUpSchema');
const owner1 = require('../models/OwnerSignupSchema');
const profile1 = require('../models/profileDataSchema');
const property1 = require('../models/propertySchema');
var bcrypt = require('bcryptjs');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const PropertyType = new GraphQLObjectType({
    name: 'property',
    fields: () => ({
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        building: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        headline: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        bedrooms: { type: GraphQLInt },
        accomodates: { type: GraphQLInt },
        bathrooms: { type: GraphQLInt },
        bookingoptions: { type: GraphQLInt },
        photos: { type: GraphQLString },
        startdate: { type: GraphQLString },
        enddate: { type: GraphQLString },
        currency: { type: GraphQLString },
        rent: { type: GraphQLInt },
        tax: { type: GraphQLInt },
        cleaningfee: { type: GraphQLInt },
        ownername: { type: GraphQLString },
        bookedUser: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})


const ProfileType = new GraphQLObjectType({
    name: 'profileData',
    fields: () => ({
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        aboutMe: { type: GraphQLString },
        city: { type: GraphQLString },
        company: { type: GraphQLString },
        Gender: { type: GraphQLString },
        hometown: { type: GraphQLString },
        laguages: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        school: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

const TravelerType = new GraphQLObjectType({
    name: 'Traveler',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})

var loginResult;
const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        travelerLogin: {
            type: TravelerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args);
                await traveler1.findOne({ email: args.email }, function (err, res) {
                    if (bcrypt.compareSync(args.password, res.password)) {
                        res.status = 200;
                        loginResult = res;
                    } else {
                        res.status = 400;
                        loginResult = res;
                    }
                })
                return loginResult;
            }
        },
        travelersList: {
            type: new GraphQLList(TravelerType),
            resolve(parent, args) {
                return traveler1.find()
            }
        },
        ownerLogin: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }

            },
            async resolve(parent, args) {
                console.log(args);
                await owner1.findOne({ email: args.email }, function (err, res) {
                    if (bcrypt.compareSync(args.password, res.password)) {
                        res.status = 200;
                        loginResult = res;
                    } else {
                        res.status = 400;
                        loginResult = res;
                    }
                })
                return loginResult;
            }
        },
        ownersList: {
            type: new GraphQLList(OwnerType),
            resolve(parent, args) {
                return owner1.find()
            }
        },
        profile: {
            type: ProfileType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args) {
                return profile1.findOne({email:args})
            }
        },
        property: {
            type: PropertyType,
            args: { ownername: { type: GraphQLString } },
            resolve(parent, args) {
                return property1.findOne()
            }
        },
        propertiesList: {
            type: new GraphQLList(PropertyType),
            resolve(parent, args) {
                return property1.find()
            }
        },
        PropertiesBookedBy: {
            type: new GraphQLList(PropertyType),
            args: {
                bookedUser: { type: GraphQLString }
            },
            resolve(parent, args) {
                return property1.find({ bookedUser: args.bookedUser })
            }
        },
        PropertiesPostedBy: {
            type: new GraphQLList(PropertyType),
            args: {
                ownername: { type: GraphQLString }
            },
            resolve(parent, args) {
                return property1.find({ ownername: args.ownername })
            }
        }
    }
})

var addTravelerResult;
var addOwnerResult;
var addUpdateProfileResult;

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
            async resolve(parent, args) {
                //new traveler creation with imported travelerschema.
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(args.password, salt);
                let traveler = new traveler1({ //dont use same names
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hash
                })
                await traveler.save().then((res)=> {
                    if (res) {
                        res.status = 200;
                        addTravelerResult = res;
                    } else {
                        res.status = 400;
                        addTravelerResult = res;
                    }
                })
                return addTravelerResult;

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
            async resolve(parent, args) {
                //new traveler creation with imported travelerschema.
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(args.password, salt);
                let owner = new owner1({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hash
                })
                await owner.save().then((res)=> {
                    if (res) {
                        res.status = 200;
                        addOwnerResult = res;
                    } else {
                        res.status = 400;
                        addOwnerResult = res;
                    }
                })
                return addOwnerResult;
            }
        },
        addProfile: {
            type: ProfileType,
            args: {
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                aboutMe: { type: GraphQLString },
                city: { type: GraphQLString },
                company: { type: GraphQLString },
                Gender: { type: GraphQLString },
                hometown: { type: GraphQLString },
                laguages: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                school: { type: GraphQLString }
            },
            resolve(parent, args) {
                //directly use ...args, it will update only received arguments.
                profile1.updateOne({ email: args.email }, { $set: { ...args } }, { upsert: true }, (err, result) => {
                    if (err) {
                        result.status=400;
                        addUpdateProfileResult = result;
                        console.log("Something wrong when updating data!");
                    }else{
                        result.status=200;
                        addUpdateProfileResult = result
                    }
                    console.log(result);
                });
                return addUpdateProfileResult;
            }
        },
        addProperty: {
            type: PropertyType,
            args: {
                country: { type: GraphQLString },
                street: { type: GraphQLString },
                building: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zipcode: { type: GraphQLString },
                headline: { type: GraphQLString },
                description: { type: GraphQLString },
                type: { type: GraphQLString },
                bedrooms: { type: GraphQLInt },
                accomodates: { type: GraphQLInt },
                bathrooms: { type: GraphQLInt },
                bookingoptions: { type: GraphQLInt },
                photos: { type: GraphQLString },
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                currency: { type: GraphQLString },
                rent: { type: GraphQLInt },
                tax: { type: GraphQLInt },
                cleaningfee: { type: GraphQLInt },
                ownername: { type: GraphQLString },
                bookedUser: { type: GraphQLString },
            },
            resolve(parent, args) {
                property1.updateOne({ ownername: args.ownername }, { $set: { ...args } }, { upsert: true }, (err, result) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    console.log(result);
                    return result;
                });
                return args;
            }
        },
        makeBooking: {
            type: PropertyType,
            args: {
                startdate: { type: GraphQLString },
                enddate: { type: GraphQLString },
                ownername: { type: GraphQLString },
                bookedUser: { type: GraphQLString },
            },
            resolve(parent, args) {
                property1.updateOne({ ownername: args.ownername }, { $set: { ...args } }, { upsert: true }, (err, result) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    console.log(result);
                    return result;
                });
                return args;
            }
        },
    }
})

module.exports = new GraphQLSchema({
    //query and mutation are predefined, must be used as it is (as per my observation)//
    query: Query,
    mutation: Mutation,
});