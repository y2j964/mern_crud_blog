import {
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
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
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
