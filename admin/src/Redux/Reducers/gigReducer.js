import * as ActionTypes from "../Constants/gigConstants";

const initialState = {
    loading: false,
    gigs: {},
    error: null,
};
const gigReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Get_GIG_LIST_REQUEST:
            return { ...state, loading: true };
        case ActionTypes.Get_GIG_LIST_SUCCESS:
            return { ...state, loading: false, gigs: action.payload };
        case ActionTypes.Get_GIG_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default gigReducer;
