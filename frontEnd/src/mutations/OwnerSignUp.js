import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const addNewOwner = gql`mutation($firstName:String,$lastName:String,$email:String,$password:String) {
    addOwner(firstName:$firstName, lastName: $lastName, email: $email, password: $password) {
      status
    }
  }
  `
  export { addNewOwner };