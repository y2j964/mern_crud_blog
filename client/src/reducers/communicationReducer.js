import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  CLEAR_STATUSES,
  CLEAR_STATUS_GROUP,
} from '../actions/types';

const initialState = {
  posts: {
    isLoading: false,
    success: null,
    errorMessage: null,
  },
  session: {
    isLoading: false,
    success: null,
    errorMessage: null,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        [action.payload.scope]: {
          isLoading: true,
          success: null,
          errorMessage: null,
        },
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        [action.payload.scope]: {
          isLoading: false,
          success: action.payload.successMessage,
          errorMessage: null,
        },
      };

    case REQUEST_FAILURE:
      return {
        ...state,
        [action.payload.scope]: {
          isLoading: false,
          success: null,
          errorMessage: action.payload.errorMessage,
        },
      };
    case CLEAR_STATUSES:
      return initialState;
    case CLEAR_STATUS_GROUP:
      return {
        ...state,
        [action.payload.scope]: {
          isLoading: false,
          success: null,
          errorMessage: null,
        },
      };
    default:
      return state;
  }
}
