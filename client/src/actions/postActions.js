import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POSTS,
  LOADING_POSTS,
} from './types';
// import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => console.log(err));
};

export const loadingPosts = () => dispatch => {
  dispatch({ type: LOADING_POSTS });
};

export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts', post)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => console.log(err));
};

export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => dispatch({ type: DELETE_POST, payload: id }))
    .catch(err => console.log(err));
};

export const updatePost = post => (dispatch, getState) => {
  axios
    .patch(`/api/posts/${post._id}`, post)
    .then(res => dispatch({ type: UPDATE_POST, payload: res.data }))
    .catch(err => console.log(err, post));
};

// export const addPost = post => (dispatch, getState) => {
//   // post data to database, THEN dispatch to reducer so that front end is in sync w/ backend
//   axios
//     .post('/api/post', post)
//     .then(res => dispatch({ type: ADD_POST, payload: res.data }))
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

// export const deletePost = id => (dispatch, getState) => {
//   axios
//     .delete(`/api/post/${id}`)
//     .then(res => dispatch({ type: DELETE_POST, payload: id }))
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
