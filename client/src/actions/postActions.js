import axios from 'axios';
import { ADD_POST, DELETE_POST, UPDATE_POST, GET_POSTS } from './types';
// import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
  dispatch({ type: GET_POSTS });
};

export const deletePost = postSlug => (dispatch, getState) => {
  dispatch({ type: DELETE_POST, payload: postSlug });
};

// export const deletePost = id => (dispatch, getState) => {
//   axios
//     .delete(`/api/post/${id}`)
//     .then(res => dispatch({ type: DELETE_POST, payload: id }))
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const addPost = post => (dispatch, getState) => {
  dispatch({ type: ADD_POST, payload: post });
};

export const updatePost = post => (dispatch, getState) => {
  dispatch({ type: UPDATE_POST, payload: post });
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
