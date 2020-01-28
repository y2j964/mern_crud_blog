import React from 'react';
import PropTypes from 'prop-types';
import Close from '../../icons/Close';

function Dialog({
  ariaHidden,
  tabIndex,
  handleClose,
  additionalClasses,
  dataTestId,
  children,
}) {
  return (
    <div
      className={`modal__dialog ${additionalClasses}`}
      aria-hidden={ariaHidden}
      data-testid={dataTestId}
    >
      <button
        className="modal__close-btn"
        aria-label="close modal"
        tabIndex={tabIndex}
        onClick={handleClose}
      >
        <Close fill="black" />
      </button>
      {children}
    </div>
  );
}

Dialog.propTypes = {
  ariaHidden: PropTypes.string,
  tabIndex: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  additionalClasses: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
};

export default Dialog;
