import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


const validateTravelerLogin = gql`
    query travelerLogin($email: String, $password: String){
        travelerLogin(email: $email, password: $password){
        firstName,
        lastName,
        email,
        password,
        status
    }
}`

// const validateTravelerLogin = gql`{
//     travelersList
//     {
//         firstName,
//         lastName,
//         email,
//         password,
//     }
// }`

export { validateTravelerLogin };