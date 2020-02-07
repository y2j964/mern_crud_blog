import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchGlass from '../../icons/SearchGlass';
import Close from '../../icons/Close';

export default function SearchBoxTrigger({
  toggleIsSearchBoxOpen,
  isSearchBoxOpen,
}) {
  // focus the input upon expansion
  useEffect(() => {
    // requires a timeout for this to work w/ transition
    const timeoutID = setTimeout(() => {
      if (isSearchBoxOpen) {
        document.getElementById('searchInput').focus();
      }
    }, 75);
    return () => clearTimeout(timeoutID);
  }, [isSearchBoxOpen]);
  return (
    <button
      className="p-1 hidden md:block"
      aria-label="search for post"
      onClick={toggleIsSearchBoxOpen}
    >
      {!isSearchBoxOpen ? (
        <SearchGlass fill="#000" />
      ) : (
        <Close fill="#000" width="20px" height="20px" />
      )}
    </button>
  );
}

SearchBoxTrigger.propTypes = {
  toggleIsSearchBoxOpen: PropTypes.func.isRequired,
  isSearchBoxOpen: PropTypes.bool.isRequired,
};
