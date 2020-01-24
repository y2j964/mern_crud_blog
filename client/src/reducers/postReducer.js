import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../actions/types';

const initialState = {
  items: [],
  isInitiallyFetched: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        items: action.payload,
        isInitiallyFetched: true,
      };
    case ADD_POST:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case UPDATE_POST:
      return {
        ...state,
        items: state.items.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
}
