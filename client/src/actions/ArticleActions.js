import { ADD_ARTICLE, DELETE_ARTICLE } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const deleteArticle = id => (dispatch, getState) => {
  axios
    .delete(`/api/articles/${id}`)
    .then(res => dispatch({ type: DELETE_ARTICLE, payload: id }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addArticle = article => (dispatch, getState) => {
  // post data to database, THEN dispatch to reducer so that front end is in sync w/ backend
  axios
    .post('/api/articles', article)
    .then(res => dispatch({ type: ADD_ARTICLE, payload: res.data }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
