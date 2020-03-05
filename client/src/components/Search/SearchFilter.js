import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { postsType } from '../Card/types';
import Modal from '../Modal/Modal';
import Dialog from '../Modal/Dialog';
import SearchBoxInput from './SearchBoxInput';
import SearchGlass from '../../icons/SearchGlass';
import SearchResultsRenderer from './SearchResultsRender';
import SearchResults from './SearchResults';
import useDebounce from '../../utils/useDebounce';

const delay = 500;

// only filter input based on these properties
const relevantKeys = ['title', 'description', 'author'];

// return only the values of the relevant filmObj keys, so that we can check those values against our RegExp
const getRelevantValues = (targetedObj, targetedKeys) => {
  const relevantValues = [];
  targetedKeys.forEach(property => {
    relevantValues.push(targetedObj[property]);
  });
  return relevantValues;
};

export const getFilteredPosts = (dataSource, searchQuery) => {
  const updatedFilteredPosts = dataSource.filter(film => {
    const relevantValues = getRelevantValues(film, relevantKeys);
    // return Posts that have words that start with the input value and are followed by zero or more non-whitespace characters
    return new RegExp(`\\b${searchQuery}\\S*`, 'i').test(relevantValues);
  });
  return updatedFilteredPosts;
};

function SearchFilter({ isOpen, handleClose, posts }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, delay);

  // when user stops typing for debounced timeout
  useEffect(() => {
    if (debouncedInputValue) {
      // mimic loading
      setIsLoading(true);
      setTimeout(() => {
        const updatedFilteredPosts = getFilteredPosts(
          posts,
          debouncedInputValue
        );
        setFilteredPosts(updatedFilteredPosts);
        setIsLoading(false);
      }, 500);
    } else {
      setFilteredPosts([]);
    }
  }, [debouncedInputValue, posts]);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedFilteredPosts = getFilteredPosts(posts, inputValue);
    setFilteredPosts(updatedFilteredPosts);
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      additionalClasses="modal--large"
    >
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames="search-scale"
        appear
      >
        <Dialog handleClose={handleClose}>
          <header className="py-6">
            <h2 className="text-4xl text-center font-bold" id="modalHeading">
              Search
            </h2>
          </header>
          <div className="flex items-center mb-8">
            <SearchGlass fill="black" additionalClasses="mr-2" />
            <form className="w-full" role="search" onSubmit={handleSubmit}>
              <SearchBoxInput value={inputValue} setValue={setInputValue} />
            </form>
          </div>
          <SearchResultsRenderer
            debouncedInputValue={debouncedInputValue}
            isLoading={isLoading}
            totalResults={filteredPosts.length}
          >
            <SearchResults
              posts={filteredPosts}
              totalResults={filteredPosts.length}
            />
          </SearchResultsRenderer>
        </Dialog>
      </CSSTransition>
    </Modal>
  );
}

SearchFilter.propTypes = {
  posts: postsType,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  isLoading: state.communication.posts.isLoading,
});

export default connect(mapStateToProps)(SearchFilter);
