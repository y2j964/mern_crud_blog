/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, loadingPosts } from '../actions/postActions';
import WithLoadingIndicator from './WithLoadingIndicator';
import { postsType } from './Card/types';

function AllPosts({
  posts,
  isInitiallyFetched,
  isLoading,
  getPosts,
  loadingPosts,
  children,
}) {
  // if haven't fetched posts yet, fetch them
  useEffect(() => {
    if (!isInitiallyFetched) {
      loadingPosts();
      getPosts();
    }
  }, [isInitiallyFetched, getPosts, loadingPosts]);

  return (
    <WithLoadingIndicator
      isLoading={isLoading}
      render={() => children(posts)}
    />
  );
}

AllPosts.propTypes = {
  posts: postsType,
  isInitiallyFetched: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  loadingPosts: PropTypes.func.isRequired,
  children: PropTypes.func,
};

const mapStateToProps = state => ({
  isInitiallyFetched: state.posts.isInitiallyFetched,
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
