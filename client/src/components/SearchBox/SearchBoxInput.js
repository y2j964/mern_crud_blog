import React from 'react'
import PropTypes from 'prop-types'

function SearchBoxInput({value, setValue, searchInputId}) {
  return (
    <React.Fragment>
    <label htmlFor={searchInputId || "searchInput" } className="sr-only">
        Search MERN Crud Blog
      </label>
    <input
        className="search-box__input"
        id={searchInputId || "searchInput" }
        type="search"
        role="searchbox"
        placeholder="Search"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      </React.Fragment>
  )
}

SearchBoxInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  searchInputId: PropTypes.string
}

export default SearchBoxInput

