import React from 'react';
import PropTypes from 'prop-types';

function WithEmpty({ length, Component, render }) {
  return !length ? <Component /> || null : render();
}

WithEmpty.propTypes = {
  length: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
};

export default WithEmpty