import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postType } from '../components/Card/types';
import LockScreen from '../components/LockScreen';
import EditPostAuthenticated from './EditPostAuthenticated';

// eslint-disable-next-line no-shadow
function EditPost({ isAuthenticated, openLogin }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Edit Post - MERN Crud Blog';
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
        Edit Post
      </h1>
      {!isAuthenticated ? (
        <LockScreen
          message={'You need to be logged in to edit a post.'}
          openLogin={openLogin}
        />
      ) : (
        <EditPostAuthenticated />
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
