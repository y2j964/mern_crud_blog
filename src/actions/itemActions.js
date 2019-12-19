import { ADD_ITEM, DELETE_ITEM } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => dispatch({ type: DELETE_ITEM, payload: id }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  // post data to database, THEN dispatch to reducer so that front end is in sync w/ backend
  axios
    .post('/api/items', item)
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
