import { ADD_POST, DELETE_POST, GET_POSTS } from './types';
import axios from 'axios';
// import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
  dispatch({ type: GET_POSTS });
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
  // post data to database, THEN dispatch to reducer so that front end is in sync w/ backend
  dispatch({ type: ADD_POST, payload: post });
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
