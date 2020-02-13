import React from 'react';
import PropTypes from 'prop-types';
import SearchGlass from '../../icons/SearchGlass';
import Close from '../../icons/Close';

function SearchModalTrigger({ openSearchModal, isSearchBoxOpen }) {
  return (
    <React.Fragment>
      <button
        className="p-1 hidden md:block"
        aria-label="search for post"
        data-testid="searchDesktop"
        onClick={openSearchModal}
      >
        {!isSearchBoxOpen ? (
          <SearchGlass fill="#000" />
        ) : (
          <Close fill="#000" width="20px" height="20px" />
        )}
      </button>
    </React.Fragment>
  );
}

SearchModalTrigger.propTypes = {
  openSearchModal: PropTypes.func.isRequired,
  isSearchBoxOpen: PropTypes.bool.isRequired,
};

export default SearchModalTrigger;
