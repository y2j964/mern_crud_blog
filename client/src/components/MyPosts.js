import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsType } from './Card/types';
import WithEmpty from './WithEmpty';
import { getPostsByAuthor } from '../selectors/postSelectors';

function EmptyMyPosts() {
  return (
    <p>
      You currently haven&apos;t made any contributions to MERN CRUD Blog. Want
      to get started? Head to{' '}
      <Link to={'/add-post'} className="underline text-accent">
        Add Post
      </Link>
    </p>
  );
}

// eslint-disable-next-line no-shadow
function MyPosts({ posts, children }) {
  return (
    <WithEmpty
      length={posts.length}
      Component={EmptyMyPosts}
      render={() => children(posts)}
    ></WithEmpty>
  );
}

MyPosts.propTypes = {
  posts: postsType,
  children: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  posts: getPostsByAuthor(state, state.auth.user),
});

export default connect(mapStateToProps)(MyPosts);
