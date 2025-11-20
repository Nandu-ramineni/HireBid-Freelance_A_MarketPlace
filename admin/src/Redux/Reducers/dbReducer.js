import * as ActionTypes from "../Constants/dbConstants";

const initialState = {
    loading: false,
    dbStats: {},
    serverStats: {},
    apiLatency: {},
    error: null,
};

export const dbReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_DB_STATS_REQUEST:  
            return { ...state, loading: true };
        case ActionTypes.GET_DB_STATS_SUCCESS:
            return { ...state, loading: false, dbStats: action.payload };
        case ActionTypes.GET_DB_STATS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ActionTypes.GET_SERVER_STATS_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.GET_SERVER_STATS_SUCCESS:
            return { ...state, loading: false, serverStats: action.payload };
        case ActionTypes.GET_SERVER_STATS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ActionTypes.GET_API_LATENCY_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.GET_API_LATENCY_SUCCESS:
            return { ...state, loading: false, apiLatency: action.payload };
        case ActionTypes.GET_API_LATENCY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default dbReducer;