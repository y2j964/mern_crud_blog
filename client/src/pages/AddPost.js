import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import { generateSlug } from '../utilityFunctions/generateSlug';
import { InputText } from '../components/Input';
import TextArea from '../components/TextArea';

// eslint-disable-next-line no-shadow
function AddPost({ addPost, history }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Add Post - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  const [postTitleValue, setPostTitleValue] = useState('');
  const [postDescriptionValue, setPostDescriptionValue] = useState('');
  const [postBodyValue, setPostBodyValue] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (submissionSuccess) {
        history.push('/');
      }
    }, 1000);
  }, [submissionSuccess, history]);

  const onSubmit = e => {
    const name = 'Mark Twain';
    // name will come from redux auth
    e.preventDefault();
    const post = {
      title: postTitleValue,
      description: postDescriptionValue,
      author: name,
      date: 'Friday 3:30PM',
      id: uuid.v4(),
      authorSlug: generateSlug(name),
      postSlug: generateSlug(postTitleValue),
    };

    addPost(post);
    setSubmissionSuccess(true);
    // redirect back to home
  };

  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className="text-4xl py-8 text-center font-bold"
      >
        Add Post
      </h1>
      {!submissionSuccess ? (
        <form action="" onSubmit={onSubmit}>
          <InputText
            labelText={'Title: '}
            name="postTitle"
            isRequired={true}
            value={postTitleValue}
            handleChange={e => setPostTitleValue(e.target.value)}
          />
          <InputText
            labelText={'Description: '}
            name="postDescription"
            isRequired={true}
            value={postDescriptionValue}
            handleChange={e => setPostDescriptionValue(e.target.value)}
          />
          <TextArea
            labelText={'Body: '}
            name="postBody"
            isRequired={true}
            rows={5}
            value={postBodyValue}
            handleChange={e => setPostBodyValue(e.target.value)}
          />
          <button
            type="submit"
            className="accent-btn accent-btn--is-glowing w-full mt-2"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-center">
          Post Added! Navigating back to posts . . .{' '}
        </p>
      )}
    </main>
  );
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(withRouter(AddPost));
