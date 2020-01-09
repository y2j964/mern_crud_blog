import {
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  LOADING_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case UPDATE_USER:
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        items: state.items.filter(item => item.userSlug !== action.payload),
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
