import React from 'react';
import PropTypes from 'prop-types';
import { ErrorNotification } from './Notification/Notification';

export default function WithErrorNotification({ error }) {
  return !error ? null : <ErrorNotification errorMessage={error} />;
}

WithErrorNotification.propTypes = {
  error: PropTypes.string,
};
