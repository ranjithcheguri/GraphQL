var mongoose = require('mongoose');
const Schema = mongoose.Schema; //Capital S

var propertySchema = new Schema({
    country: String,
    street: String,
    building: String,
    city: String,
    state: String,
    zipcode: String,
    headline: String,
    description: String,
    type: String,
    bedrooms: Number,
    accomodates: Number,
    bathrooms: Number,
    bookingoptions: Number,
    photos: String,
    startdate: String,
    enddate: String,
    currency: String,
    rent: Number,
    tax: Number,
    cleaningfee: Number,
    ownername: String,
    bookedUser: String,
})

//ownerLogins ==> its the collection name automatically created with graphQL mutation for every owner insertion
module.exports = mongoose.model('propertyInfo', propertySchema); //ownerlogin --> ownerlogins ( collection ).