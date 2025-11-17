import axios from "axios";
import * as actionTypes from '../Constants/jobConstants';
import Cookies from "js-cookie";
const URL = "http://localhost:7000/api";


export const postGig = (formData) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.POST_JOB_REQUEST });
        const { data } = await axios.post(`${URL}/jobs/post-job`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: actionTypes.POST_JOB_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.POST_JOB_FAILURE, payload: error.message });
    }
}

export const getJobs = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_JOB_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/jobs`);
        dispatch({ type: actionTypes.GET_JOB_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_JOB_FAILURE, payload: e.message });
    }
}

export const getJobById = (id) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_JOB_DETAILS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/jobs/${id}`);
        dispatch({ type: actionTypes.GET_JOB_DETAILS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.GET_JOB_DETAILS_FAILURE, payload: e.message });
    }
}

export const deleteJob = (id) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.DELETE_JOB_REQUEST });
        const { data } = await axios.delete(`${URL}/jobs/job/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.DELETE_JOB_SUCCESS, payload: data });
    } catch (e) {
        dispatch({ type: actionTypes.DELETE_JOB_FAILURE, payload: e.message });
    }
}   

export const saveGig = (jobId) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.SAVE_GIG_REQUEST });
        const { data } = await axios.post(`${URL}/jobs/job/save-gig`, { jobId },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.SAVE_GIG_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.SAVE_GIG_FAILURE, payload: error.message });
        throw error;
    }
}

export const getFreelancerSavedGigs = () => async(dispatch) =>{
    try {
        dispatch({type: actionTypes.GET_GIGS_BY_FREELANCER_REQUEST});
        const { data } = await axios.get(`${URL}/jobs/jobs/savedGigs`,{
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({type: actionTypes.GET_GiGS_BY_FREELANCER_SUCCESS, payload: data});
        return data;
    } catch (error) {
        dispatch({type: actionTypes.GET_GIGS_BY_FREELANCER_FAILURE, payload: error.message});
    }
}

export const unsaveGig = (jobId) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.UNSAVE_GIG_REQUEST });

        const { data } = await axios.delete(`${URL}/jobs/jobs/unsave`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'application/json',
            },
            data: { jobId },  // ✅ this is how you send the body in a DELETE request
        });

        dispatch({ type: actionTypes.UNSAVE_GIG_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.UNSAVE_GIG_FAILURE, payload: error.message });
        throw error;
    }
};


export const getClientGigs = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_CLIENT_GIGS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/client/jobs`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_CLIENT_GIGS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_CLIENT_GIGS_FAILURE, payload: error.message });
    }
}



export const getClientReport = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_CLIENT_REPORT_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/client-report`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_CLIENT_REPORT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_CLIENT_REPORT_FAILURE, payload: error.message });
    }
}

export const getClientInvoices = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_CLIENT_INVOICE_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/client/invoices`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_CLIENT_INVOICE_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.GET_CLIENT_INVOICE_FAILURE, payload: error.message });
        throw error
    }
}

export const getFreelancerFinancialOverview = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/freelancer/financial-overview`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_FAILURE, payload: error.message });
    }
}

export const getFreelancerTransactionHistory = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/payment-history`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_FAILURE, payload: error.message });
    }
}

export const getFreelancerAnalytics = () => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.GET_FREELANCER_ANALYTICS_REQUEST });
        const { data } = await axios.get(`${URL}/jobs/freelancer/analytics`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.GET_FREELANCER_ANALYTICS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_FREELANCER_ANALYTICS_FAILURE, payload: error.message });
    }
}