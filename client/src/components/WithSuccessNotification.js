import React from 'react';
import PropTypes from 'prop-types';
import { SuccessNotification } from './Notification/Notification';

function WithSuccessNotification({ success }) {
  return !success ? null : <SuccessNotification successMessage={success} />;
}

WithSuccessNotification.propTypes = {
  success: PropTypes.bool,
};

export default WithSuccessNotification;