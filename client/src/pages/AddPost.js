import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddPostAuthenticated from '../components/AddPostAuthenticated';
import LockScreen from '../components/LockScreen';

// eslint-disable-next-line no-shadow
function AddPost({ isAuthenticated, openLogin }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Add Post - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className="text-4xl py-8 text-center font-bold"
      >
        Add Post
      </h1>
      {!isAuthenticated ? (
        <LockScreen
          message={'You need to be logged in to add a post.'}
          openLogin={openLogin}
        />
      ) : (
        <AddPostAuthenticated />
      )}
    </main>
  );
}

AddPost.propTypes = {
  isAuthenticated: PropTypes.bool,
  openLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(AddPost);
