import React from 'react';
import PropTypes from 'prop-types';
import CardGroup from '../Card/CardGroup';
import { postsType } from '../Card/types';

function SearchResults({ posts, totalResults }) {
  return (
    <React.Fragment>
      <h3 className="text-3xl text-center font-bold py-6">
        {totalResults} Results
      </h3>
      <CardGroup posts={posts} />
    </React.Fragment>
  );
}

SearchResults.propTypes = {
  posts: postsType.isRequired,
  totalResults: PropTypes.number.isRequired,
};

export default SearchResults;
