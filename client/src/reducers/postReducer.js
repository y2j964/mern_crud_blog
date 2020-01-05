import uuid from 'uuid';
import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  LOADING_POSTS,
} from '../actions/types';

const initialState = {
  items: [
    {
      title: 'Welcome to MERN Crud Blog!',
      description: 'This is a bunch of apocryphal rhubarb',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut venenatis tellus in metus. Sodales neque sodales ut etiam sit amet nisl. Fringilla phasellus faucibus scelerisque eleifend. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Velit scelerisque in dictum non. Facilisis volutpat est velit egestas dui id ornare arcu odio. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Amet massa vitae tortor condimentum lacinia quis vel. In nisl nisi scelerisque eu ultrices vitae auctor. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Sit amet massa vitae tortor condimentum. Enim sit amet venenatis urna.',
      author: 'Dougie Jones',
      date: 'Thursday 3:30PM',
      id: uuid.v4(),
      authorSlug: 'dougie-jones',
      postSlug: 'welcome-mern-crud-blog',
    },
    {
      title: 'Me and My Tulpas',
      description: 'A guide to living in the world of David Lynch',
      body:
        'Neque sodales ut etiam sit amet nisl. Ac auctor augue mauris augue neque. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Nec ultrices dui sapien eget mi. Dapibus ultrices in iaculis nunc sed augue. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Purus semper eget duis at tellus at urna condimentum. Tristique nulla aliquet enim tortor at. At augue eget arcu dictum varius duis at. Nunc sed velit dignissim sodales. Tristique nulla aliquet enim tortor at auctor urna. Diam volutpat commodo sed egestas egestas. Faucibus vitae aliquet nec ullamcorper sit amet risus. Semper auctor neque vitae tempus quam pellentesque. Vel pretium lectus quam id. Ultricies lacus sed turpis tincidunt id.',
      author: 'Special Agent Dale Cooper',
      date: 'Friday 3:30PM',
      id: uuid.v4(),
      authorSlug: 'dale-cooper',
      postSlug: 'me-and-my-tulpas',
    },
  ],
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: false,
      };
    case LOADING_POSTS:
      return {
        ...state,
        isLoading: true,
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
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter(item => item.postSlug !== action.payload),
      };
    default:
      return state;
  }
}
