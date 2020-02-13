import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function SearchBoxInput({ value, setValue, searchInputId }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <React.Fragment>
      <label htmlFor={searchInputId || 'searchInput'} className="sr-only">
        Search MERN Crud Blog
      </label>
      <input
        className="search-box-input"
        id={searchInputId || 'searchInput'}
        ref={ref}
        type="search"
        role="searchbox"
        placeholder="Search"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </React.Fragment>
  );
}

SearchBoxInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  searchInputId: PropTypes.string,
};

export default SearchBoxInput;
