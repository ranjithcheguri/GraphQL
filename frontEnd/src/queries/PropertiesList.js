import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
const propertiesList = gql`{
        propertiesList{
        country 
        street 
        building 
        city 
        state 
        zipcode 
        headline 
        description 
        type 
        bedrooms
        accomodates
        bathrooms
        bookingoptions
        startdate 
        enddate 
        currency 
        rent
        tax
        cleaningfee
    }
}`
export { propertiesList };