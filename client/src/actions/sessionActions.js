import axios from 'axios';
import { getErrors } from './errorActions';
import {
  GET_USER,
  LOADING_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

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

// Check token & load user
export const getUser = () => (dispatch, getState) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/api/auth', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(getErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
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

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        getErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
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

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(err => {
      dispatch(
        getErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
