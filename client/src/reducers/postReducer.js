import { GET_POSTS, ADD_POST, DELETE_POST } from '../actions/types';

const initialState = {
  items: [
    {
      title: 'Welcome to MERN Crud Blog!',
      description: 'This is a bunch of apocryphal rhubarb',
      author: 'Dougie Jones',
      date: 'Thursday 3:30PM',
      authorSlug: 'dougie-jones',
      postSlug: 'welcome-mern-crud-blog',
    },
    {
      title: 'Me and My Tulpas',
      description: 'A guide to living in the world of David Lynch',
      author: 'Special Agent Dale Cooper',
      date: 'Friday 3:30PM',
      authorSlug: 'dale-cooper',
      postSlug: 'me-and-my-tulpas',
    },
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
      };
    case ADD_POST:
      return {
        ...state,
        items: [action.payload, ...state.items],
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
