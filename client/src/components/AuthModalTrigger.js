import React from 'react';
import PropTypes from 'prop-types';

export default function AuthModalTrigger({
  handleClick,
  children,
  additionalClasses,
}) {
  return (
    <button
      className={`navbar__link ${additionalClasses || ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

AuthModalTrigger.propTypes = {
  handleClick: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
  children: PropTypes.node,
};
