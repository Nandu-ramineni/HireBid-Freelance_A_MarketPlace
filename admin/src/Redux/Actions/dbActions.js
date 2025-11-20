import * as ActionTypes from "../Constants/dbConstants";
import Cookies from "js-cookie";
import axios from "axios";
const API_URL = "http://localhost:5002/api";

export const getDBStats = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_DB_STATS_REQUEST });
        const response = await axios.get(`${API_URL}/v1/admin/monitor/db`, { 
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.GET_DB_STATS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ActionTypes.GET_DB_STATS_FAILURE, payload: error.response.data });
    }
}

export const getServerStats = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_SERVER_STATS_REQUEST });
        const response = await axios.get(`${API_URL}/v1/admin/monitor/server`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.GET_SERVER_STATS_SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: ActionTypes.GET_SERVER_STATS_FAILURE, payload: error.response.data });
    }
}

export const getAPILatency = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_API_LATENCY_REQUEST });
        const response = await axios.get(`${API_URL}/v1/admin/monitor/latency`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: ActionTypes.GET_API_LATENCY_SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: ActionTypes.GET_API_LATENCY_FAILURE, payload: error.response.data });
    }
}