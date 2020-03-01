import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import WithLoadingIndicator from '../components/WithLoadingIndicator';
import { postsType } from '../components/Card/types';
import CardGroup from '../components/Card/CardGroup';

// eslint-disable-next-line no-shadow
function Home({ posts, isInitiallyFetched, isLoading, getPosts }) {
  const ref = useRef();

  useEffect(() => {
    document.title = 'MERN CRUD Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  useEffect(() => {
    if (!isInitiallyFetched) {
      getPosts();
    }
  }, [isInitiallyFetched, getPosts]);

  return (
    <main>
      <header className="py-8">
        <h1 tabIndex="-1" ref={ref} className="text-4xl text-center font-bold">
          Blog Posts
        </h1>
      </header>
      <WithLoadingIndicator
        isLoading={isLoading}
        render={() => <CardGroup posts={posts} />}
      />
    </main>
  );
}

Home.propTypes = {
  posts: postsType,
  isInitiallyFetched: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isInitiallyFetched: state.posts.isInitiallyFetched,
  posts: state.posts.items,
  isLoading: state.communication.posts.isLoading,
});

export default connect(mapStateToProps, { getPosts })(Home);
