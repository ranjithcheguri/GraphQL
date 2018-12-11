var mongoose = require('mongoose');
const Schema = mongoose.Schema; //Capital S

var TravelerSignUpSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('travelerSignUp', TravelerSignUpSchema);