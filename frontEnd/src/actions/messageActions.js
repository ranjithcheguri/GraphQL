// All Login actions should be done, variables must be imported from types.js
import { SUBMIT_MESSAGE } from './types';
import axios from "axios";
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

//const ROOT_URL = "http://localhost:3001";

export const submitMessage = (message) => dispatch => {
    //code here
    console.log("Actions : sending Message...");
    axios.defaults.withCredentials = true;
    console.log(message);

    /******************** MESSAGES **************************/
    axios.post(IP_backEnd + IP_NODE_PORT + '/message', message)
        .then(response => {
            console.log("respose received Message Actions:", response)
            dispatch({
                type: SUBMIT_MESSAGE,
                response: response.data,
                payload: response.status
            })
        })
        .catch((error) => {
            console.log("Action Catch : ", error.response.status);
            dispatch({
                //ERROR 400 status
                type: SUBMIT_MESSAGE,
                payload: error.response.status
            })
        })

}
