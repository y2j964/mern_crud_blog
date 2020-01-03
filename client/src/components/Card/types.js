import PropTypes from 'prop-types';

export const postType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  authorSlug: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
});

// eslint-disable-next-line import/prefer-default-export
export const postsType = PropTypes.arrayOf(postType);
