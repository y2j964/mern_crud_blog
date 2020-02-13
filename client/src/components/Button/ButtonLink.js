import React from 'react';
import PropTypes from 'prop-types';

function ButtonLink({ handleClick, additionalClasses, dataTestId, children }) {
  return (
    <button
      className={`navbar__link pseudo-underline ${additionalClasses || ''}`}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

ButtonLink.propTypes = {
  handleClick: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};

export default ButtonLink;
