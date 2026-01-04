import * as actionTypes from "../Constants/jobConstants"

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
    error: null,
}

export const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        // ------------------------
        // GET JOBS
        // ------------------------
        case actionTypes.GET_JOB_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_JOB_SUCCESS:
            return { ...state, loading: false, jobs: action.payload, error: null }

        case actionTypes.GET_JOB_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // GET JOB DETAILS
        // ------------------------
        case actionTypes.GET_JOB_DETAILS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_JOB_DETAILS_SUCCESS:
            return { ...state, loading: false, jobDetails: action.payload, error: null }

        case actionTypes.GET_JOB_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // SAVE / UNSAVE
        // ------------------------
        case actionTypes.SAVE_GIG_REQUEST:
        case actionTypes.UNSAVE_GIG_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.SAVE_GIG_SUCCESS:
            return { ...state, loading: false, savedGigs: action.payload, error: null }

        case actionTypes.UNSAVE_GIG_SUCCESS:
            return {
                ...state,
                loading: false,
                savedGigs: state.savedGigs.filter((gig) => gig._id !== action.payload),
                error: null,
            }

        case actionTypes.SAVE_GIG_FAILURE:
        case actionTypes.UNSAVE_GIG_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // GET GIGS BY FREELANCER
        // ------------------------
        case actionTypes.GET_GIGS_BY_FREELANCER_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_GIGS_BY_FREELANCER_SUCCESS: // <-- fix spelling (see note below)
            return { ...state, loading: false, savedGigs: action.payload, error: null }

        case actionTypes.GET_GIGS_BY_FREELANCER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // CLIENT GIGS
        // ------------------------
        case actionTypes.GET_CLIENT_GIGS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_CLIENT_GIGS_SUCCESS:
            return { ...state, loading: false, clientGigs: action.payload, error: null }

        case actionTypes.GET_CLIENT_GIGS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // POST / DELETE JOB
        // ------------------------
        case actionTypes.POST_JOB_REQUEST:
        case actionTypes.DELETE_JOB_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.POST_JOB_SUCCESS:
            return { ...state, loading: false, jobs: [...state.jobs, action.payload], error: null }

        case actionTypes.DELETE_JOB_SUCCESS:
            return { ...state, loading: false, jobs: state.jobs.filter((j) => j._id !== action.payload), error: null }

        case actionTypes.POST_JOB_FAILURE:
        case actionTypes.DELETE_JOB_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // ------------------------
        // REPORT / INVOICE / ANALYTICS
        // ------------------------
        case actionTypes.GET_CLIENT_REPORT_REQUEST:
        case actionTypes.GET_CLIENT_INVOICE_REQUEST:
        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_REQUEST:
        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_REQUEST:
        case actionTypes.GET_FREELANCER_ANALYTICS_REQUEST:
            return { ...state, loading: true, error: null }

        case actionTypes.GET_CLIENT_REPORT_SUCCESS:
            return { ...state, loading: false, report: action.payload, error: null }

        case actionTypes.GET_CLIENT_INVOICE_SUCCESS:
            return { ...state, loading: false, invoicesData: action.payload, error: null }

        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_SUCCESS:
            return { ...state, loading: false, financialOverview: action.payload, error: null }

        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_SUCCESS:
            return { ...state, loading: false, paymentHistory: action.payload, error: null }

        case actionTypes.GET_FREELANCER_ANALYTICS_SUCCESS:
            return { ...state, loading: false, freelancerAnalytics: action.payload, error: null }

        case actionTypes.GET_CLIENT_REPORT_FAILURE:
        case actionTypes.GET_CLIENT_INVOICE_FAILURE:
        case actionTypes.GET_FREELANCER_FINANCIAL_OVERVIEW_FAILURE:
        case actionTypes.GET_FREELANCER_TRANSACTION_HISTORY_FAILURE:
        case actionTypes.GET_FREELANCER_ANALYTICS_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // optional manual clear
        case actionTypes.CLEAR_JOB_ERROR:
            return { ...state, error: null }

        default:
            return state
    }
}
