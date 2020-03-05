import axios from 'axios';
import { ADD_POST, DELETE_POST, UPDATE_POST, GET_POSTS } from './types';
import { tokenConfig } from './sessionActions';
import {
  requestPending,
  requestSuccess,
  requestFailure,
} from './communicationActions';

const scope = 'posts';

export const getPosts = () => dispatch => {
  dispatch(requestPending(scope));
  axios
    .get('/api/posts')
    .then(res => {
      dispatch({ type: GET_POSTS, payload: res.data });
      dispatch(requestSuccess(scope, GET_POSTS));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

export const addPost = post => (dispatch, getState) => {
  dispatch(requestPending(scope));
  axios
    .post('/api/posts', post, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(requestSuccess(scope, ADD_POST));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

export const deletePost = id => (dispatch, getState) => {
  dispatch(requestPending(scope));
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({ type: DELETE_POST, payload: id });
      dispatch(requestSuccess(scope, DELETE_POST));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

export const updatePost = post => (dispatch, getState) => {
  dispatch(requestPending(scope));
  axios
    .patch(`/api/posts/${post._id}`, post, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_POST, payload: res.data });
      dispatch(requestSuccess(scope, UPDATE_POST));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};
