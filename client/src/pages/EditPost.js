import React, { useEffect, useRef, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postType } from '../components/Card/types';
import LockScreen from '../components/LockScreen';
import Spinner from '../icons/Spinner';

const EditPostForm = lazy(() => import('../components/EditPostForm'));

// eslint-disable-next-line no-shadow
function EditPost({ isAuthenticated, openLogin }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Edit Post - MERN CRUD Blog';
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
        Edit Post
      </h1>
      {!isAuthenticated ? (
        <LockScreen
          message={'You need to be logged in to edit a post.'}
          openLogin={openLogin}
        />
      ) : (
        <Suspense fallback={<Spinner />}>
          <EditPostForm />
        </Suspense>
      )}
    </main>
  );
}

EditPost.propTypes = {
  isAuthenticated: PropTypes.bool,
  openLogin: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string,
    }),
  }),
  post: postType,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(EditPost);
