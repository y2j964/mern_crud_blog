import React from 'react';
import PropTypes from 'prop-types';
import SearchGlass from '../../icons/SearchGlass';
import Close from '../../icons/Close';

function SearchFilterTrigger({ openSearchFilter, isSearchFilterOpen }) {
  return (
    <React.Fragment>
      <button
        className="p-1 hidden md:block"
        aria-label="search for post"
        data-testid="searchDesktop"
        onClick={openSearchFilter}
      >
        {!isSearchFilterOpen ? (
          <SearchGlass fill="#000" />
        ) : (
          <Close fill="#000" width="20px" height="20px" />
        )}
      </button>
    </React.Fragment>
  );
}

SearchFilterTrigger.propTypes = {
  openSearchFilter: PropTypes.func.isRequired,
  isSearchFilterOpen: PropTypes.bool.isRequired,
};

export default SearchFilterTrigger;
