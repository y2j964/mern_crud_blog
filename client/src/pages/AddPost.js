import React, { useEffect, useRef, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LockScreen from '../components/LockScreen';
import Spinner from '../icons/Spinner';

const AddPostForm = lazy(() => import('../components/AddPostForm'));

// eslint-disable-next-line no-shadow
function AddPost({ isAuthenticated, openLogin }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Add Post - MERN CRUD Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className={`text-4xl pt-8 text-center font-bold ${
          !isAuthenticated ? 'pb-8' : 'pb-2'
        }`}
      >
        Add Post
      </h1>
      {!isAuthenticated ? (
        <LockScreen
          message={'You need to be logged in to add a post.'}
          openLogin={openLogin}
        />
      ) : (
        <Suspense fallback={<Spinner />}>
          <AddPostForm />
        </Suspense>
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
