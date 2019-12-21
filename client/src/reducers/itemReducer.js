import { ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    default:
      return state;
  }
}
