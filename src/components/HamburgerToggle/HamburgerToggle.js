import React from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from '../../icons/HamburgerMenu';

export default function HamburgerToggle({
  controls,
  collapsibleNavIsExpanded,
  handleClick,
}) {
  return (
    <button
      className="hamburger-toggle"
      onClick={handleClick}
      aria-label="toggle collapsible navigation menu"
      aria-controls={controls}
      aria-expanded={collapsibleNavIsExpanded}
    >
      <HamburgerMenu />
    </button>
  );
}

HamburgerToggle.propTypes = {
  controls: PropTypes.string.isRequired,
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
