import * as ActionTypes from "../Constants/authConstants";

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null,
    admin: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Admin_Login_Request:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.Admin_Login_Success:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                admin: action.payload
            };
        case ActionTypes.Admin_Login_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload?.message || "Something went wrong"
            };
        case ActionTypes.Admin_Logout:
            return {
                ...state,
                admin: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}