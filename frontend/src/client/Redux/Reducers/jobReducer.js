import * as actionTypes from '../Constants/jobConstants';
const initialState = {
    jobs: [],
    jobDetails: {},
    savedGigs: [],
    clientGigs: [],
    report: {},
    invoicesData: {},
    financialOverview: {},
    paymentHistory: {},
    freelancerAnalytics: {},
    loading: false,
    error: null
};

export const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_JOB_SUCCESS:
            return {
                ...state,
                jobs: action.payload
            };
        case actionTypes.GET_JOB_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.GET_JOB_DETAILS_SUCCESS:
            return {
                ...state,
                jobDetails: action.payload
            };
        case actionTypes.GET_JOB_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.SAVE_GIG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SAVE_GIG_SUCCESS:
            return {
                ...state,
                loading: false,
                savedGigs: action.payload
            };
        case actionTypes.SAVE_GIG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_GIGS_BY_FREELANCER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_GiGS_BY_FREELANCER_SUCCESS:
            return {
                ...state,
                loading: false,
                savedGigs: action.payload
            };
        case actionTypes.GET_GIGS_BY_FREELANCER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.UNSAVE_GIG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.UNSAVE_GIG_SUCCESS:
            return {
                ...state,
                loading: false,
                savedGigs: state.savedGigs.filter(gig => gig._id !== action.payload) 
            };
        case actionTypes.UNSAVE_GIG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_CLIENT_GIGS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CLIENT_GIGS_SUCCESS:
            return {
                ...state,
                loading: false,
                clientGigs: action.payload
            };
        case actionTypes.GET_CLIENT_GIGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.POST_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.POST_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: [...state.jobs, action.payload]
            };
        case actionTypes.POST_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.DELETE_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: state.jobs.filter(job => job._id !== action.payload)
            };
        case actionTypes.DELETE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_CLIENT_REPORT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CLIENT_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                report: action.payload
            };
        case actionTypes.GET_CLIENT_REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_CLIENT_INVOICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_CLIENT_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoicesData: action.payload
            };
        case actionTypes.GET_CLIENT_INVOICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                financialOverview: action.payload
            };
        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentHistory: action.payload
            };
        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.GET_FREELANCER_ANALYTICS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_FREELANCER_ANALYTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                freelancerAnalytics: action.payload
            };
        case actionTypes.GET_FREELANCER_ANALYTICS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            
        default:
            return state;
    }
    
}
