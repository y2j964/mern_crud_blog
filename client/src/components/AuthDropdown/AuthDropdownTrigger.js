import React from 'react';
import PropTypes from 'prop-types';
import User from '../../icons/User';

function AuthDropdownTrigger({
  isDropdownOpen,
  toggleIsDropdownOpen,
  isAuthenticated,
}) {
  return (
    <button
      className="md:hidden flex items-center"
      onClick={toggleIsDropdownOpen}
      aria-label="toggle user menu"
      aria-controls="userDropdown"
      aria-expanded={isDropdownOpen}
    >
      <User
        width="22px"
        height="22px"
        fill={isAuthenticated ? '#7300e6' : '#000'}
      />
      <span className="caret"></span>
    </button>
  );
}

AuthDropdownTrigger.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleIsDropdownOpen: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default AuthDropdownTrigger;
