var mongoose = require('mongoose');
const Schema = mongoose.Schema; //Capital S

var TravelerSignUpSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

//exports.schema=schema;
module.exports = mongoose.model('travelerSignUp', TravelerSignUpSchema);