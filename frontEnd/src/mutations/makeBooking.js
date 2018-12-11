import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const makeBooking = gql`mutation($ownername:String,$bookedUser:String,$startdate:String,$enddate:String) {
    makeBooking(ownername:$ownername,bookedUser:$bookedUser,startdate:$startdate,enddate:$enddate) {
      status
    }
  }
  `

export { makeBooking };