import React from 'react';
import PropTypes from 'prop-types';

function Notification({ message, styleType }) {
  return (
    <div className={`notification ${styleType}`} role="alert">
      <p className="notification__text">{message}</p>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  styleType: PropTypes.string.isRequired,
};

function ErrorNotification({ errorMessage }) {
  return (
    <Notification message={errorMessage} styleType="notification--error" />
  );
}

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

function SuccessNotification() {
  return (
    <Notification message={'Success!'} styleType="notification--success" />
  );
}

SuccessNotification.propTypes = {
  successMessage: PropTypes.bool.isRequired,
};

export { ErrorNotification, SuccessNotification };
