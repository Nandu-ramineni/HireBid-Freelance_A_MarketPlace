import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { jobReducer } from './Reducers/jobReducer';
import { bidReducer } from './Reducers/bidReducer';
import { chatReducer } from './Reducers/chatReducer';
import { subscriptionReducer } from './Reducers/subscriptionReducer';



const reducer = combineReducers({
    getJobs: jobReducer,
    bids: bidReducer,
    getChats: chatReducer,
    subscriptions: subscriptionReducer
})
const middleware= [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;