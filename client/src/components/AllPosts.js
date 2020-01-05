import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, loadingPosts } from '../actions/postActions';
import WithLoadingIndicator from './WithLoadingIndicator';
import { postsType } from './Card/types';

// eslint-disable-next-line no-shadow
function AllPosts({ posts, isLoading, getPosts, loadingPosts, children }) {
  useEffect(() => {
    loadingPosts();
    setTimeout(() => {
      getPosts();
    }, 500);
  }, [getPosts, posts]);

  return (
    <WithLoadingIndicator
      isLoading={isLoading}
      render={() => children(posts)}
    />
  );
}

AllPosts.propTypes = {
  posts: postsType,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  children: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  isLoading: state.posts.isLoading,
});

export default connect(mapStateToProps, { getPosts, loadingPosts })(AllPosts);

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getPosts } from '../actions/postActions';
// import WithLoadingIndicator from './WithLoadingIndicator';

// function AllPosts({ getPosts, children }) {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     getPosts();
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   }, [getPosts]);

//   console.log('loader');

//   return <WithLoadingIndicator isLoading={isLoading} render={() => children} />;
// }

// AllPosts.propTypes = {
//   getPosts: PropTypes.func.isRequired,
//   children: PropTypes.node,
// };

// export default connect(null, { getPosts })(AllPosts);
