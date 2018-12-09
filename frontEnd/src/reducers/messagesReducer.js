//states of individual comoponents go here.
import { SUBMIT_MESSAGE } from '../actions/types';

const initialState = {
    message: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SUBMIT_MESSAGE:
            if (action.payload === 200) {
                console.log("Message Reducer : message sent successfully");
                return {
                    ...state,
                    message: action.response,
                    responseCode: action.payload
                }
            } else {
                console.log("Message Reducer : message failed to send!");
                return {
                    ...state,
                    responseCode: action.payload
                }
            }
        default:
            return state;
    }
}