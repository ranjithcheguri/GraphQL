import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const addUpdateProfile = gql`mutation($email:String,$firstName:String,$lastName:String,$aboutMe:String,$city:String,$company:String,$Gender:String,$hometown:String,$languages:String,$phoneNumber:String,$school:String) {
    addProfile(email:$email,firstName:$firstName,lastName:$lastName,aboutMe:$aboutMe,city:$city,company:$company,Gender:$Gender,hometown:$hometown,languages:$languages,phoneNumber:$phoneNumber,school:$school) {
      status
    }
  }
  `

  export { addUpdateProfile };