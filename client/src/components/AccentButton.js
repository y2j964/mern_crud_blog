import React from 'react';
import PropTypes from 'prop-types';

function AccentButton({
  handleClick,
  additionalClasses,
  dataTestId,
  children,
}) {
  return (
    <button
      className={`accent-btn accent-btn--is-glowing ${additionalClasses || ''}`}
      onClick={handleClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

AccentButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};

export default AccentButton;
