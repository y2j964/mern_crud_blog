import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/sessionActions';
import AuthDropdownTrigger from './AuthDropdownTrigger';

// eslint-disable-next-line no-shadow
function AuthDropdown({ isAuthenticated, setAuthModalPosition, logoutUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  // close dropdown on outside click/focus
  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => setIsDropdownOpen(false));
  };
  const handleFocus = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <span className="relative" onBlur={handleBlur} onFocus={handleFocus}>
      <AuthDropdownTrigger
        isDropdownOpen={isDropdownOpen}
        toggleIsDropdownOpen={() => setIsDropdownOpen(!isDropdownOpen)}
        isAuthenticated={isAuthenticated}
      />
      <ul
        className={`auth-dropdown ${
          isDropdownOpen ? 'auth-dropdown--is-open' : ''
        }`}
        id="userDropdown"
      >
        {isAuthenticated ? (
          <li>
            <button
              className="auth-dropdown__item"
              onClick={() => logoutUser()}
            >
              Log Out
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <button
                className="auth-dropdown__item"
                onClick={() => setAuthModalPosition('login')}
                data-testid="mobileLoginModalBtn"
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className="auth-dropdown__item"
                onClick={() => setAuthModalPosition('register')}
                data-testid="mobileRegisterModalBtn"
              >
                Register
              </button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </span>
  );
}

AuthDropdown.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAuthModalPosition: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(AuthDropdown);
