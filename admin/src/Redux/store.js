import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { authReducer } from './Reducers/authReducer';
import { userReducer } from './Reducers/userReducer';
import { bidReducer, gigReducer } from './Reducers/gigReducer';
import dbReducer from './Reducers/dbReducer';

const reducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    gigs: gigReducer,
    bids: bidReducer,
    db: dbReducer,
})
const middleware= [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;