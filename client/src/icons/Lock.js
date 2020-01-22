import React from 'react';
import PropTypes from 'prop-types';

export default function Lock({ width, height, fill, additionalClasses }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={width || '200'}
      height={height || '200'}
      fill={fill || 'black'}
      className={additionalClasses || ''}
      aria-hidden="true"
    >
      <path d="M15 21.915v0c-0.583-0.206-1-0.762-1-1.415 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.653-0.417 1.209-1 1.415v2.594c0 0.263-0.224 0.491-0.5 0.491-0.268 0-0.5-0.22-0.5-0.491v-2.594zM8 14v0 0c-1.658 0.005-3 1.34-3 3.009v9.981c0 1.662 1.346 3.009 3.009 3.009h14.982c1.662 0 3.009-1.337 3.009-3.009v-9.981c0-1.659-1.341-3.005-3-3.009v-3.501c0-4.142-3.366-7.499-7.5-7.499-4.142 0-7.5 3.357-7.5 7.499v3.501zM11 14v-3.499c0-2.492 2.015-4.501 4.5-4.501 2.48 0 4.5 2.015 4.5 4.501v3.499h-9z"></path>
    </svg>
  );
}

Lock.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  additionalClasses: PropTypes.string,
};