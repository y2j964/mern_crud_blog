import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../icons/Spinner';

function WithLoadingIndicator({
  isLoading,
  Component = Spinner,
  render,
}) {
  return isLoading ? <Component /> : render();
}

WithLoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  Component: PropTypes.elementType,
  render: PropTypes.func.isRequired,
};

export default WithLoadingIndicator;