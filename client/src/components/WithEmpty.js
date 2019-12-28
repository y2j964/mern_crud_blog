import React from 'react';
import PropTypes from 'prop-types';

export default function WithIsEmpty({ length, Component, render }) {
  return !length ? <Component /> || null : render();
}

WithIsEmpty.propTypes = {
  length: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
};
