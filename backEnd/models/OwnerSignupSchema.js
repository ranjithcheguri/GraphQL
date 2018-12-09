var mongoose = require('mongoose');
const Schema = mongoose.Schema; //Capital S

var OwnerSignupSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

//ownerLogins ==> its the collection name automatically created with graphQL mutation for every owner insertion
module.exports = mongoose.model('ownerSignUp', OwnerSignupSchema); //ownerlogin --> ownerlogins ( collection ).