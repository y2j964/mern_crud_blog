import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBoxInput from './SearchBoxInput';

function SearchBox({ additionalClasses, searchInputId }) {
  const [value, setValue] = useState('');
  return (
    <form className={additionalClasses} role="search">
      <SearchBoxInput value={value} setValue={setValue} searchInputId={searchInputId}/>
    </form>
  );
}

SearchBox.propTypes = {
  additionalClasses: PropTypes.string,
  searchInputId: PropTypes.string
};

export default SearchBox;
