import { combineReducers } from 'redux';
import postReducer from './postReducer';
import sessionReducer from './sessionReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  posts: postReducer,
  session: sessionReducer,
  error: errorReducer,
});
