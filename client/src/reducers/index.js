import { combineReducers } from 'redux';
import postReducer from './postReducer';
import sessionReducer from './sessionReducer';
import communicationReducer from './communicationReducer';

export default combineReducers({
  posts: postReducer,
  session: sessionReducer,
  communication: communicationReducer,
});
