import * as actionTypes from '../Constants/subscriptionConstants';

const initialState = {
    subscription: [],
    loading: false,
    error: null
};

export const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload
            };
        case actionTypes.GET_SUBSCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.BUY_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.BUY_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                subscription: action.payload
            };
        case actionTypes.BUY_SUBSCRIPTION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}