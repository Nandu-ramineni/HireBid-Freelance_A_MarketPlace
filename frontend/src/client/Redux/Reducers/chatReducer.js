import * as actionTypes from '../Constants/chatConstants';

const initialState = {
    chat: {},       // Metadata like jobId, clientId, freelancerId
    messages: [],   // Chat messages array
    loading: false,
    error: null
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        // 🔄 Send message
        case actionTypes.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                messages: [...state.messages, action.payload]
            };
        case actionTypes.SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        // 📥 Fetch messages and chat info
        case actionTypes.GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                chat: {
                    _id: action.payload.chat._id,
                    jobId: action.payload.chat.jobId,
                    clientId: action.payload.chat.clientId,
                    freelancerId: action.payload.chat.freelancerId,
                    createdAt: action.payload.chat.createdAt
                },
                messages: action.payload.chat.messages
            };
        case actionTypes.GET_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        // 📨 Add a new message to the chat
        case "ADD_MESSAGE":
        return {
            ...state,
            error: null,
            messages: [...state.messages, action.payload],
        };
        // ⚡ For real-time message via socket
        case actionTypes.RECEIVE_MESSAGE:
            return {
                ...state,
                error: null,
                messages: [...state.messages, action.payload]
            };
        // 🔄 Reset chat messages when jobId change
        case actionTypes.RESET_CHAT_MESSAGES:
            return {
                ...state,
                error: null,
                loading: false,
                chat: {},
                messages: [],
            };

        default:
            return state;
    }
};
