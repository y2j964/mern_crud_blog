export const getPost = (state, props) =>
  state.posts.items.find(item => item.postSlug === props.postSlug);

export const getPostsByAuthor = (state, props) =>
  state.posts.items.filter(item => item.authorSlug === props.authorSlug);
