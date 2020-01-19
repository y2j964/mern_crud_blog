import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POSTS,
  LOADING_POSTS,
} from './types';
import { tokenConfig } from './sessionActions';
import { getErrors } from './errorActions';

export const getPosts = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err =>
      dispatch(getErrors(err.response.data.msg, err.response.status))
    );
};

export const loadingPosts = () => dispatch => {
  dispatch({ type: LOADING_POSTS });
};

export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts', post, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err =>
      dispatch(getErrors(err.response.data.msg, err.response.status))
    );
};

export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(() => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err =>
      dispatch(getErrors(err.response.data.msg, err.response.status))
    );
};

export const updatePost = post => (dispatch, getState) => {
  axios
    .patch(`/api/posts/${post._id}`, post, tokenConfig(getState))
    .then(res => dispatch({ type: UPDATE_POST, payload: res.data }))
    .catch(err =>
      dispatch(getErrors(err.response.data.msg, err.response.status))
    );
};
