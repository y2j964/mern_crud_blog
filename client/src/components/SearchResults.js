import React from 'react';
import PropTypes from 'prop-types';

function SearchResults(props) {
  return (
    <div
      className="fixed right-0 top-0 bottom-0 z-10 bg-blue-300"
      style={{
        width: '464px',
        marginTop: '72px',
        transition: 'transform 300ms ease',
        transform: 'translateX(464px)',
      }}
    ></div>
  );
}

SearchResults.propTypes = {};

export default SearchResults;
