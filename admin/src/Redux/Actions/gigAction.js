import Cookies from "js-cookie";
import * as ActionTypes from "../Constants/gigConstants";
import axios from "axios";
const API_URL = "http://localhost:5002/api";

export const getGigList = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Get_GIG_LIST_REQUEST });
        const response = await axios.get(`${API_URL}/v1/admin/gigs/getGigs`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.Get_GIG_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ActionTypes.Get_GIG_LIST_FAILURE, payload: error.response.data });
    }
}