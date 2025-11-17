import Cookies from "js-cookie";
import * as ActionTypes from "../Constants/userConstants";
import axios from "axios";
const API_URL = "http://localhost:5002/api";


export const getTotalUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Get_Users_Request });
        const response = await axios.get(`${API_URL}/v1/admin/users/getUsers`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.Get_Users_Success, payload: response.data});
        return response.data;

    } catch (error) {
        dispatch({ type: ActionTypes.Get_Users_Failure, payload: error.response.data });
    }
}

export const getTotalClients = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Get_Clients_Request });
        const response = await axios.get(`${API_URL}/v1/admin/users/getClients`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.Get_Clients_Success, payload: response.data });
    } catch (error) {
        dispatch({ type: ActionTypes.Get_Clients_Failure, payload: error.response.data });
    }
}

export const getTotalFreelancers = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Get_Freelancers_Request });
        const response = await axios.get(`${API_URL}/v1/admin/users/getFreelancers`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.Get_Freelancers_Success, payload: response.data });
    } catch (error) {
        dispatch({ type: ActionTypes.Get_Freelancers_Failure, payload: error.response.data });
    }
}

export const updateUserStatus = (userId, data) => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.Update_User_Status_Request });
        const response = await axios.patch(`${API_URL}/v1/admin/users/update-status/${userId}`, data, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.Update_User_Status_Success, payload: response.data });
        return response.data;
    } catch (error) {
        const message = error?.response?.data || { message: "Something went wrong" };

        dispatch({
            type: ActionTypes.Update_User_Status_Failure,
            payload: message
        });

        throw message;
    }
}