import React from 'react';
import PropTypes from 'prop-types';
import Lock from '../icons/Lock';

function LockScreen({ message, openLogin }) {
  return (
    <React.Fragment>
      <p>
        {message}{' '}
        <button
          className="text-blue-400"
          onClick={openLogin}
          aria-label="open login"
        >
          Head to Login
        </button>
        .
      </p>
      <div className="absolutely-centered z-neg">
        <Lock additionalClasses={'lock-icon'} />
      </div>
    </React.Fragment>
  );
}

LockScreen.propTypes = {
  message: PropTypes.string.isRequired,
  openLogin: PropTypes.func.isRequired,
};

export default LockScreen;
