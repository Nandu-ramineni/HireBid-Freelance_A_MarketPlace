import axios from "axios";
import * as actionTypes from '../Constants/chatConstants';
import Cookies from "js-cookie";

const URL = "http://localhost:9000/api";

export const sentMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SEND_MESSAGE_REQUEST });
        const { data } = await axios.post(`${URL}/chat/send`, message,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.SEND_MESSAGE_SUCCESS, payload: data.message });
    } catch (e) {
        dispatch({ type: actionTypes.SEND_MESSAGE_FAIL, payload: e.message });
    }
}

export const getChats = (jobId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_MESSAGES_REQUEST });
        const { data } = await axios.get(`${URL}/chat/${jobId}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.GET_MESSAGES_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_MESSAGES_FAIL, payload: e.message });
    }
}
