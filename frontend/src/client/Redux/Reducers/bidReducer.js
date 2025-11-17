
import * as actionTypes from '../Constants/bidConstants';

const initialState = {
    bids: [], 
    bidDetails: {},
    completeBid: {},
    completedBids: [],
    clientBids: [],
    error: null,
    loading: false
};

export const bidReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BID_CREATE_SUCCESS:
            return {
                ...state,
                bids: [...state.bids, action.payload], 
                loading: false
            };
        case actionTypes.BID_CREATE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.GET_FREELANCER_BIDS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FREELANCER_BIDS_SUCCESS:
            return {
                ...state,
                bids: action.payload.bids,  
                loading: false
            };
        case actionTypes.GET_FREELANCER_BIDS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case actionTypes.GET_BID_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_BID_DETAILS_SUCCESS:
            return {
                ...state,
                bidDetails: action.payload,
                loading: false
            };
        case actionTypes.GET_BID_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_SUCCESS:
            return {
                ...state,
                bidDetails: action.payload,
                loading: false
            };
        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.ACCEPT_BID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ACCEPT_BID_SUCCESS:
            return {
                ...state,
                bidDetails: action.payload, 
                loading: false
            };
        case actionTypes.ACCEPT_BID_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.COMPLETE_BID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.COMPLETE_BID_SUCCESS:
            return {
                ...state,
                completeBid: action.payload, 
                loading: false
            };
        case actionTypes.COMPLETE_BID_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.GET_CLIENT_BIDS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CLIENT_BIDS_SUCCESS:
            return {
                ...state,
                clientBids: action.payload, 
                loading: false
            };
        case actionTypes.GET_CLIENT_BIDS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.GET_CLIENT_COMPLETED_BIDS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CLIENT_COMPLETED_BIDS_SUCCESS:
            return {
                ...state,
                completedBids: action.payload, 
                loading: false
            };
        case actionTypes.GET_CLIENT_COMPLETED_BIDS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_SUCCESS:
            return {
                ...state,
                completedBids: action.payload, 
                loading: false
            };
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
            
        default:
            return state; 
    }
};
