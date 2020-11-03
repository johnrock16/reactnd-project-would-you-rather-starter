import { combineReducers } from 'redux';
import {UserReducer} from './reducers/UserReducer';
import {UsersReducer} from './reducers/UsersReducers';

export const reducers=combineReducers({
    UserReducer,
    UsersReducer,
})