import React from 'react';
import PropTypes from 'prop-types';

export default function HamburgerToggle({
  width,
  height,
  fill,
  additionalClasses,
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={width || '20'}
      height={height || '20'}
      fill={fill || 'black'}
      aria-hidden="true"
      className={additionalClasses || ''}
    >
      <path d="M0 3h20v2h-20v-2zM0 9h20v2h-20v-2zM0 15h20v2h-20v-2z"></path>
    </svg>
  );
}

HamburgerToggle.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  additionalClasses: PropTypes.string,
};
