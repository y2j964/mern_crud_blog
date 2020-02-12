import React from 'react';
import PropTypes from 'prop-types';
import { ErrorNotification } from './Notification/Notification';

function WithErrorNotification({ error }) {
  return !error ? null : <ErrorNotification errorMessage={error} />;
}

WithErrorNotification.propTypes = {
  error: PropTypes.string,
};

export default WithErrorNotification;