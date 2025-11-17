import axios from "axios";
import * as actionTypes from '../Constants/bidConstants';
import Cookies from "js-cookie";



const URL = "http://localhost:7000/api";

export const placeBid = (bid) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.BID_CREATE_REQUEST });
        const { data } = await axios.post(`${URL}/jobs/bids`, 
            bid, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        
        dispatch({ type: actionTypes.BID_CREATE_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.BID_CREATE_FAIL, payload: error.message });
        throw error;
    }
}

export const getFreelancerBids = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_FREELANCER_BIDS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/user-bids`, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.GET_FREELANCER_BIDS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_FREELANCER_BIDS_FAIL, payload: e.message });
    }
}

export const getBidDetails = (bidId) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_BID_DETAILS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/bid/${bidId}`, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.GET_BID_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_BID_DETAILS_FAILURE, payload: e.message });
    }
}

export const getBidsByJobId = (jobId) => async(dispatch) =>{
    try {
        dispatch({type:actionTypes.GET_BIDS_FOR_CLIENT_JOB_REQUEST});
        const { data } = await axios.get(`${URL}/jobs/bids/${jobId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_BIDS_FOR_CLIENT_JOB_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_BIDS_FOR_CLIENT_JOB_FAIL, payload: error.message });
    }
}

export const acceptBid = (bidId,status) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.ACCEPT_BID_REQUEST });
        const { data } = await axios.patch(`${URL}/jobs/bids/${bidId}/accept`, { status }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.ACCEPT_BID_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.ACCEPT_BID_FAIL, payload: error.message });
    }
}

export const completeBid = (bidId,status) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.COMPLETE_BID_REQUEST });
        const { data } = await axios.patch(`${URL}/jobs/bids/${bidId}/complete`, { status }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.COMPLETE_BID_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.COMPLETE_BID_FAIL, payload: error.message });
        throw error;
    }
}

export const getClientBids = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_CLIENT_BIDS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/client-accepted-bids`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_CLIENT_BIDS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_CLIENT_BIDS_FAIL, payload: error.message });
    }
}

export const getClientCompletedBids = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_CLIENT_COMPLETED_BIDS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/client-completed-bids`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_CLIENT_COMPLETED_BIDS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_CLIENT_COMPLETED_BIDS_FAIL, payload: error.message });
    }
}

export const getFreelancerCompletedBids = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_FREELANCER_COMPLETED_BIDS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/freelancer-completed-bids`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_FREELANCER_COMPLETED_BIDS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FREELANCER_COMPLETED_BIDS_FAIL, payload: error.message });
    }
}
