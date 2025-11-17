import axios from "axios";
import * as actionTypes from '../Constants/subscriptionConstants';
import Cookies from "js-cookie";
const URL = "http://localhost:5000/api";

export const getSubscription = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_SUBSCRIPTION_REQUEST });
        const { data } = await axios.get(`${URL}/subscription/userSubscriptions`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_SUBSCRIPTION_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_SUBSCRIPTION_FAIL, payload: e.message });
    }
}

export const buySubscription = ({plan, amount, currency}) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.BUY_SUBSCRIPTION_REQUEST });

        const { data } = await axios.post(`${URL}/subscription/subscribe`, { plan, amount, currency}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.BUY_SUBSCRIPTION_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({ type: actionTypes.BUY_SUBSCRIPTION_FAIL, payload: e.message });
        throw e;
    }
};



