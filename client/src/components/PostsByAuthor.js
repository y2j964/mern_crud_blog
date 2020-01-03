import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByAuthor } from '../selectors/postSelectors';
import { postsType } from './Card/types';

function PostsByAuthor({ posts, authorSlug, children }) {
  return children(posts);
}

PostsByAuthor.propTypes = {
  posts: postsType,
  children: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  posts: getPostsByAuthor(state, props),
});

export default connect(mapStateToProps)(PostsByAuthor);
