var mongoose = require('mongoose');
const Schema = mongoose.Schema; //Capital S

var profileDataSchema = new Schema({
    email:String,
    firstName:String,
    lastName:String,
    aboutMe:String,
    city:String,
    company:String,
    Gender:String,
    hometown:String,
    laguages:String,
    phoneNumber:String,
    school:String
})

//ownerLogins ==> its the collection name automatically created with graphQL mutation for every owner insertion
module.exports = mongoose.model('profileData', profileDataSchema); //profileData --> profiledatas ( collection ).