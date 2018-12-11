import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const validateOwnerLogin = gql`
    query ownerLogin($email: String, $password: String){
        ownerLogin(email: $email, password: $password){
        status
    }
}`

export { validateOwnerLogin };