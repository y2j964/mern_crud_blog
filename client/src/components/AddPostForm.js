import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import { getName, getAuthorSlug } from '../selectors/sessionSelector';
import { generateSlug } from '../utils/generateSlug';
import { InputText } from './Input';
import TextArea from './TextArea';
import WithErrorNotification from './WithErrorNotification';
import { AccentButton } from './Button/Button';

function AddPostForm({
  history,
  // eslint-disable-next-line no-shadow
  addPost,
  name,
  authorSlug,
  errorMessage,
  postSuccess,
}) {
  const [postTitleValue, setPostTitleValue] = useState('');
  const [postDescriptionValue, setPostDescriptionValue] = useState('');
  const [postBodyValue, setPostBodyValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // redirect back to home if post succeeded
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (postSuccess) {
        history.push('/');
      }
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [postSuccess, history]);

  // if fails, reset button to default state
  useEffect(() => {
    setIsSubmitting(false);
  }, [errorMessage]);

  const handleSubmit = e => {
    // name will come from redux auth
    e.preventDefault();
    setIsSubmitting(true);

    const post = {
      title: postTitleValue,
      description: postDescriptionValue,
      body: postBodyValue,
      author: name,
      authorSlug,
      postSlug: generateSlug(postTitleValue),
    };

    addPost(post);
  };

  // if fails, reset button to default state
  useEffect(() => {
    setIsSubmitting(false);
  }, [errorMessage]);

  if (postSuccess) {
    return (
      <p className="text-center" aria-live="assertive">
        Post Added! Navigating back to posts . . .{' '}
      </p>
    );
  }

  return (
    <React.Fragment>
      <Prompt
        when={
          postTitleValue !== '' ||
          postDescriptionValue !== '' ||
          postBodyValue !== ''
        }
        message={'Changes have not been saved. Are you sure you want to exit?'}
      />
      <form action="" onSubmit={handleSubmit}>
        <WithErrorNotification error={errorMessage} />
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
        <AccentButton
          type="submit"
          additionalClasses="w-full mt-2"
          disabled={isSubmitting}
        >
          {!isSubmitting ? 'Submit' : 'Pending . . .'}
        </AccentButton>
      </form>
    </React.Fragment>
  );
}

AddPostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  authorSlug: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  postSuccess: PropTypes.bool,
};

const mapStateToProps = state => ({
  name: getName(state),
  authorSlug: getAuthorSlug(state),
  errorMessage: state.communication.posts.errorMessage,
  postSuccess: state.communication.posts.success,
});

export default withRouter(connect(mapStateToProps, { addPost })(AddPostForm));
