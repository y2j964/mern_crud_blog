import React from 'react';
import PropTypes from 'prop-types';
import WithSearchInputPrompt from '../WithInputPrompt';
import WithLoadingIndicator from '../WithLoadingIndicator';
import WithEmpty from '../WithEmpty';

function SearchResultsNone() {
  return (
    <p className="text-center">
      Can&apos;t find anything matching those terms. Try something else.
    </p>
  );
}

function LoadingText() {
  return <p className="text-center">Loading . . .</p>;
}

function SearchResultsRenderer({
  debouncedInputValue,
  isLoading,
  totalResults,
  children,
}) {
  return (
    // order is important
    <WithSearchInputPrompt
      inputValue={debouncedInputValue}
      render={() => (
        <WithLoadingIndicator
          isLoading={isLoading}
          Component={LoadingText}
          render={() => (
            <WithEmpty
              length={totalResults}
              Component={SearchResultsNone}
              render={() => children}
            />
          )}
        />
      )}
    />
  );
}

export default SearchResultsRenderer;

SearchResultsRenderer.propTypes = {
  debouncedInputValue: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  totalResults: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
