import axios from 'axios';
import {
  requestPending,
  requestSuccess,
  requestFailure,
} from './communicationActions';
import { GET_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const { token } = getState().session;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

const scope = 'session';

// Check token & load user
export const getUser = () => (dispatch, getState) => {
  axios
    .get('/api/auth', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      dispatch(requestSuccess(scope, GET_USER));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

// Register User
export const registerUser = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  dispatch(requestPending(scope));
  axios
    .post('/api/users', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
      dispatch(requestSuccess(scope, REGISTER_USER));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

// Login User
export const loginUser = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ email, password });

  dispatch(requestPending(scope));
  axios
    .post('/api/auth', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
      dispatch(requestSuccess(scope, LOGIN_USER));
    })
    .catch(err => dispatch(requestFailure(scope, err.response.data.message)));
};

// Logout User
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
