import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './post-reducer';
import commentReducer from './comment-reducer';
import friendReducer from './friend-reducer'

export default combineReducers({
    userReducer,
    postReducer,
    commentReducer,
    friendReducer
})