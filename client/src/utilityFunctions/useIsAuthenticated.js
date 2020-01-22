import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function useIsAuthenticated({ isAuthenticated }) {
  console.log(isAuthenticated);
  return isAuthenticated;
}

useIsAuthenticated.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(useIsAuthenticated);
