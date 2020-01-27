import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const initialState = {};
const middleware = [thunk];
const middlewareEnhancers = applyMiddleware(...middleware);

const composedEnhancers = composeWithDevTools(middlewareEnhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
