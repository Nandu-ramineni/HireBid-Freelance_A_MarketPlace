import axios from "axios";
import * as actionTypes from '../Constants/paymentConstants';
import Cookies from "js-cookie";
const URL = "http://localhost:5000/api";
const URL_JOB = "http://localhost:7000/api";
export const createFiatPayment = ({subscriptionId,amount,currency}) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_REQUEST });
        const { data } = await axios.post(`${URL}/payment/fiat`, { subscriptionId,amount,currency}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({ type: actionTypes.CREATE_SUBSCRIPTION_PAYMENT_FAIL, payload: e.message });
    }
}

export const captureFiatPayment = ({razorpayOrderId, razorpayPaymentId, razorpaySignature}) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_REQUEST });
        const { data } = await axios.post(`${URL}/payment/fiat/capture`, { razorpayOrderId, razorpayPaymentId, razorpaySignature}, {
            headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
            }
        });
        dispatch({ type: actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_FAIL, payload: error.message });
        throw error;
    }
}

export const payMilestones = ({amount, currency,  freelancerId, bidId, jobId, milestoneId}) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.CREATE_FIAT_PAYMENT_REQUEST });
        const { data } = await axios.post(`${URL_JOB}/job/payment/fiat`, 
            {amount, currency, freelancerId, bidId, jobId, milestoneId}, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.CREATE_FIAT_PAYMENT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_FIAT_PAYMENT_FAIL, payload: error.message });
        throw error;
    }
}

export const milestonePaymentCapture = ({razorpayOrderId, razorpayPaymentId, razorpaySignature}) => async(dispatch) =>{
    try {
        dispatch({ type: actionTypes.CAPTURE_FIAT_PAYMENT_REQUEST });
        const { data } = await axios.post(`${URL_JOB}/job/payment/fiat/capture`, 
            { razorpayOrderId, razorpayPaymentId, razorpaySignature }, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            }
        );
        dispatch({ type: actionTypes.CAPTURE_FIAT_PAYMENT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        dispatch({ type: actionTypes.CAPTURE_FIAT_PAYMENT_FAIL, payload: error.message });
        throw error;
    }
}