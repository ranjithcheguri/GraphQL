import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const addNewTraveler = gql`mutation($firstName:String,$lastName:String,$email:String,$password:String) {
    addTraveler(firstName:$firstName, lastName: $lastName, email: $email, password: $password) {
      status
    }
  }
  `

  export { addNewTraveler };