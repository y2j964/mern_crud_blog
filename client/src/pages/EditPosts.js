import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPosts from '../components/MyPosts';
import CardGroup from '../components/Card/CardGroup';
import LockScreen from '../components/LockScreen';

function EditPosts({ isAuthenticated, openLogin }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'My Posts - MERN Crud Blog';
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
        My Posts
      </h1>
      {!isAuthenticated ? (
        <LockScreen
          message={'You need to be logged in to edit a post.'}
          openLogin={openLogin}
        />
      ) : (
        <MyPosts>{posts => <CardGroup posts={posts} isEditable />}</MyPosts>
      )}
    </main>
  );
}

EditPosts.propTypes = {
  isAuthenticated: PropTypes.bool,
  openLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(EditPosts);
