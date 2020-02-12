/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// dialog should allow user to close with escape key

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function Modal({
  isOpen,
  handleClose,
  additionalClasses,
  children,
}) {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    disableBodyScroll(modalRef.current);
    // eslint-disable-next-line consistent-return
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  const handleKeyDown = e => {
    const key = e.key || e.code;
    if (key !== 'Escape') {
      return;
    }
    handleClose();
  };

  return ReactDOM.createPortal(
    <div
      className={`modal ${additionalClasses || ''}`}
      ref={modalRef}
      onKeyDown={handleKeyDown}
      aria-modal="true"
      aria-labelledby="modalHeading"
      role="dialog"
    >
      <FocusLock returnFocus={{ preventScroll: false }}>{children}</FocusLock>
    </div>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  authModalPosition: PropTypes.oneOf(['login', 'register', '']),
  children: PropTypes.node.isRequired,
};

export default Modal;