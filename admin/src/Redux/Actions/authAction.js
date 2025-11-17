import Cookies from "js-cookie";
import * as ActionTypes from "../Constants/authConstants";
import axios from "axios";
const API_URL = "http://localhost:5002/api";

export const adminLogin = (data) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Admin_Login_Request });

        const response = await axios.post(`${API_URL}/v1/admin/login`, data,{ withCredentials: true });
        dispatch({ type: ActionTypes.Admin_Login_Success, payload: response.data });
        Cookies.set('accessToken', response.data.accessToken);
        Cookies.set('refreshToken', response.data.refreshToken);
    } catch (error) {
        dispatch({ type: ActionTypes.Admin_Login_Failure, payload: error.response.data });
        throw error;
    }
}


export const logout = () => (dispatch) => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    dispatch({ type: ActionTypes.Admin_Logout});
};

