import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

// eslint-disable-next-line no-shadow
const Logout = ({ logoutUser, additionalClasses }) => {
  return (
    <button
      onClick={logoutUser}
      className={`navbar__link ${additionalClasses || ''}`}
    >
      {' '}
      Logout
    </button>
  );
};

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
};

export default connect(null, { logoutUser })(Logout);
