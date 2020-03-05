import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  CLEAR_STATUSES,
  CLEAR_STATUS_GROUP,
} from './types';

export const requestPending = scope => {
  return {
    type: REQUEST_PENDING,
    payload: { scope },
  };
};

export const requestSuccess = (scope, successMessage) => {
  return {
    type: REQUEST_SUCCESS,
    payload: { scope, successMessage },
  };
};

export const requestFailure = (scope, errorMessage) => {
  return {
    type: REQUEST_FAILURE,
    payload: { scope, errorMessage },
  };
};

export const clearStatuses = scope => {
  return {
    type: CLEAR_STATUSES,
    payload: { scope },
  };
};

export const clearStatusGroup = scope => {
  return {
    type: CLEAR_STATUS_GROUP,
    payload: { scope },
  };
};

export const clearSessionStatuses = () => clearStatusGroup('session');
export const clearPostStatuses = () => clearStatusGroup('posts');
