import React from 'react';
import PropTypes from 'prop-types';

export default function Close({ width, height, fill }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width || '24'}
      height={height || '24'}
      fill={fill || 'white'}
      aria-hidden="true"
    >
      <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
    </svg>
  );
}

Close.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};
