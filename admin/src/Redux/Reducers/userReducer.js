import * as ActionTypes from "../Constants/userConstants"

const initialState = {
    loading: false,
    error: null,
    users: {},
    clients: {},
    freelancers: {},
    updateStatus: {},
    refresh : 0
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.Get_Users_Request:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.Get_Users_Success:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case ActionTypes.Get_Users_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ActionTypes.Get_Clients_Request:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.Get_Clients_Success:
            return {
                ...state,
                loading: false,
                clients: action.payload
            };
        case ActionTypes.Get_Clients_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ActionTypes.Get_Freelancers_Request:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.Get_Freelancers_Success:
            return {
                ...state,
                loading: false,
                freelancers: action.payload
            };
        case ActionTypes.Get_Freelancers_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ActionTypes.Update_User_Status_Request:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.Update_User_Status_Success:
            return {
                ...state,
                loading: false,
                
                updateStatus: action.payload
            };
        case ActionTypes.Update_User_Status_Failure:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ActionTypes.REFRESH_USERS_DATA:
            return {
                ...state,
                refresh: state.refresh + 1
            };
        default:
            return state;
    }
}