import PropTypes from 'prop-types';

function WithHasMore({ hasMore, render }) {
  return !hasMore ? null : render();
}

WithHasMore.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

export default WithHasMore;
