import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { authReducer } from './Reducers/authReducer';
import { userReducer } from './Reducers/userReducer';
import gigReducer from './Reducers/gigReducer';

const reducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    gigs: gigReducer
})
const middleware= [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;