import { ca } from 'date-fns/locale';
import * as actionTypes from '../Constants/paymentConstants';

const initialState = {
    loading: false,
    success: false,
    error: null,
    paymentData: null,
    paymentIntent: null,
    subscriptionId: null,
    clientSecret: null,
    orderId: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SUBSCRIPTION_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case actionTypes.CREATE_SUBSCRIPTION_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                paymentIntent: action.payload.paymentIntent,
                subscriptionId: action.payload.subscriptionId,
                clientSecret: action.payload.clientSecret,
                orderId: action.payload.orderId,
            };
        case actionTypes.CREATE_SUBSCRIPTION_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                paymentData: action.payload,
            };
        case actionTypes.CAPTURE_SUBSCRIPTION_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case actionTypes.RESET_PAYMENT_STATE:
            return initialState;
        case actionTypes.CREATE_FIAT_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case actionTypes.CREATE_FIAT_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                orderId: action.payload.orderId,
                paymentId: action.payload.paymentId,
            };
        case actionTypes.CREATE_FIAT_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case actionTypes.CAPTURE_FIAT_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case actionTypes.CAPTURE_FIAT_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                paymentData: action.payload,
            };
        case actionTypes.CAPTURE_FIAT_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
}