import { ADD_ARTICLE, DELETE_ARTICLE } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_ARTICLE:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case ADD_ARTICLE:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case ADD_ARTICLE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}
