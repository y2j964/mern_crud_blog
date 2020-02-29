export const getPostBySlug = (state, props) =>
  state.posts.items.find(item => item.postSlug === props.postSlug);

export const getPostById = (state, props) =>
  state.posts.items.find(item => item._id === props.id);

export const getPostsByAuthor = (state, props) =>
  state.posts.items.filter(item => item.authorSlug === props.authorSlug);
