import * as actionTypes from "../Constants/bidConstants"

const initialState = {
    bids: [],
    bidDetails: {},
    completeBid: {},
    completedBids: [],
    clientBids: [],
    error: null,
    loading: false,
}

export const bidReducer = (state = initialState, action) => {
    switch (action.type) {
        // -------------------------
        // CREATE BID
        // -------------------------
        case actionTypes.BID_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case actionTypes.BID_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bids: [...state.bids, action.payload],
            }

        case actionTypes.BID_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        // -------------------------
        // FREELANCER BIDS
        // -------------------------
        case actionTypes.GET_FREELANCER_BIDS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_FREELANCER_BIDS_SUCCESS:
            return { ...state, loading: false, error: null, bids: action.payload.bids }

        case actionTypes.GET_FREELANCER_BIDS_FAIL:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // BID DETAILS
        // -------------------------
        case actionTypes.GET_BID_DETAILS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_BID_DETAILS_SUCCESS:
            return { ...state, loading: false, error: null, bidDetails: action.payload }

        case actionTypes.GET_BID_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // BIDS FOR CLIENT JOB
        // -------------------------
        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_SUCCESS:
            return { ...state, loading: false, error: null, bidDetails: action.payload }

        case actionTypes.GET_BIDS_FOR_CLIENT_JOB_FAIL:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // ACCEPT BID
        // -------------------------
        case actionTypes.ACCEPT_BID_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.ACCEPT_BID_SUCCESS:
            return { ...state, loading: false, error: null, bidDetails: action.payload }

        case actionTypes.ACCEPT_BID_FAIL:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // COMPLETE BID
        // -------------------------
        case actionTypes.COMPLETE_BID_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.COMPLETE_BID_SUCCESS:
            return { ...state, loading: false, error: null, completeBid: action.payload }

        case actionTypes.COMPLETE_BID_FAIL:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // CLIENT BIDS
        // -------------------------
        case actionTypes.GET_CLIENT_BIDS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_CLIENT_BIDS_SUCCESS:
            return { ...state, loading: false, error: null, clientBids: action.payload }

        case actionTypes.GET_CLIENT_BIDS_FAIL:
            return { ...state, loading: false, error: action.payload }

        // -------------------------
        // COMPLETED BIDS
        // -------------------------
        case actionTypes.GET_CLIENT_COMPLETED_BIDS_REQUEST:
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_CLIENT_COMPLETED_BIDS_SUCCESS:
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_SUCCESS:
            return { ...state, loading: false, error: null, completedBids: action.payload }

        case actionTypes.GET_CLIENT_COMPLETED_BIDS_FAIL:
        case actionTypes.GET_FREELANCER_COMPLETED_BIDS_FAIL:
            return { ...state, loading: false, error: action.payload }

        // ✅ optional: allow manual clear
        case actionTypes.CLEAR_BID_ERROR:
            return { ...state, error: null }

        default:
            return state
    }
}

// import * as actionTypes from '../Constants/bidConstants';

// const initialState = {
//     bids: [], 
//     bidDetails: {},
//     completeBid: {},
//     completedBids: [],
//     clientBids: [],
//     error: null,
//     loading: false
// };

// export const bidReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.BID_CREATE_SUCCESS:
//             return {
//                 ...state,
//                 bids: [...state.bids, action.payload], 
//                 loading: false
//             };
//         case actionTypes.BID_CREATE_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_FREELANCER_BIDS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_FREELANCER_BIDS_SUCCESS:
//             return {
//                 ...state,
//                 bids: action.payload.bids,  
//                 loading: false
//             };
//         case actionTypes.GET_FREELANCER_BIDS_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };

//         case actionTypes.GET_BID_DETAILS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_BID_DETAILS_SUCCESS:
//             return {
//                 ...state,
//                 bidDetails: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_BID_DETAILS_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };

//         case actionTypes.GET_BIDS_FOR_CLIENT_JOB_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_BIDS_FOR_CLIENT_JOB_SUCCESS:
//             return {
//                 ...state,
//                 bidDetails: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_BIDS_FOR_CLIENT_JOB_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.ACCEPT_BID_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.ACCEPT_BID_SUCCESS:
//             return {
//                 ...state,
//                 bidDetails: action.payload, 
//                 loading: false
//             };
//         case actionTypes.ACCEPT_BID_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.COMPLETE_BID_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.COMPLETE_BID_SUCCESS:
//             return {
//                 ...state,
//                 completeBid: action.payload, 
//                 loading: false
//             };
//         case actionTypes.COMPLETE_BID_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_CLIENT_BIDS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_CLIENT_BIDS_SUCCESS:
//             return {
//                 ...state,
//                 clientBids: action.payload, 
//                 loading: false
//             };
//         case actionTypes.GET_CLIENT_BIDS_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_CLIENT_COMPLETED_BIDS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_CLIENT_COMPLETED_BIDS_SUCCESS:
//             return {
//                 ...state,
//                 completedBids: action.payload, 
//                 loading: false
//             };
//         case actionTypes.GET_CLIENT_COMPLETED_BIDS_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
//         case actionTypes.GET_FREELANCER_COMPLETED_BIDS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case actionTypes.GET_FREELANCER_COMPLETED_BIDS_SUCCESS:
//             return {
//                 ...state,
//                 completedBids: action.payload, 
//                 loading: false
//             };
//         case actionTypes.GET_FREELANCER_COMPLETED_BIDS_FAIL:
//             return {
//                 ...state,
//                 error: action.payload,
//                 loading: false
//             };
            
//         default:
//             return state; 
//     }
// };
