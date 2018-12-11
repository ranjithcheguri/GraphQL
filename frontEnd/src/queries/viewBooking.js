import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const viewBookings = gql`
    query PropertiesBookedBy($bookedUser: String){
        PropertiesBookedBy(bookedUser: $bookedUser){
            headline
            description
            startdate
            enddate
            rent
    }
}`

export { viewBookings };