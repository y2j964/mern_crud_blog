/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsType } from './Card/types';
import WithEmpty from './WithEmpty';
import { getPostsByAuthor } from '../selectors/postSelectors';
import { getPosts } from '../actions/postActions';

function EmptyMyPosts() {
  return (
    <p>
      You currently haven&apos;t made any contributions to MERN CRUD Blog. Want
      to get started? Head to{' '}
      <Link to={'/add-post'} className="underline text-accent">
        Add Post.
      </Link>
    </p>
  );
}

function MyPosts({ isInitiallyFetched, myPosts, getPosts, children }) {
  // if haven't fetched posts yet, fetch them b/c we need the posts in
  // store so that our getPostsByAuthor selector works
  useEffect(() => {
    if (!isInitiallyFetched) {
      getPosts();
    }
  }, [isInitiallyFetched, getPosts]);

  return (
    <WithEmpty
      length={myPosts.length}
      Component={EmptyMyPosts}
      render={() => children(myPosts)}
    ></WithEmpty>
  );
}

MyPosts.propTypes = {
  isInitiallyFetched: PropTypes.bool.isRequired,
  myPosts: postsType,
  getPosts: PropTypes.func.isRequired,
  children: PropTypes.func,
};

const mapStateToProps = state => ({
  isInitiallyFetched: state.posts.isInitiallyFetched,
  myPosts: getPostsByAuthor(state, state.session.user),
});

export default connect(mapStateToProps, { getPosts })(MyPosts);
