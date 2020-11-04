import { combineReducers } from 'redux';
import {UserReducer} from './reducers/UserReducer';
import {UsersReducer} from './reducers/UsersReducers';
import {QuestionsReducer} from './reducers/QuestionsReducer';

export const reducers=combineReducers({
    UserReducer,
    UsersReducer,
    QuestionsReducer,
})