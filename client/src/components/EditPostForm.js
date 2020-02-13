import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../selectors/postSelectors';
import { updatePost } from '../actions/postActions';
import { InputText } from './Input';
import TextArea from './TextArea';
import { postType } from './Card/types';
import WithErrorNotification from './WithErrorNotification';
import { AccentButton } from './Button/Button';

function EditPostForm({
  history,
  post,
  // eslint-disable-next-line no-shadow
  updatePost,
  // eslint-disable-next-line no-shadow
  postSuccess,
  errorMessage,
}) {
  const { title, description, body, _id } = post || '';
  // need to use || so that it doesn't throw an error after submission is successful

  const [postTitleValue, setPostTitleValue] = useState(title);
  const [postDescriptionValue, setPostDescriptionValue] = useState(description);
  const [postBodyValue, setPostBodyValue] = useState(body);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (postSuccess) {
        history.push('/edit-posts');
        // redirect to main edit page if successful submission
      }
    }, 1000);

    return () => clearTimeout(timeoutID);
  }, [postSuccess, history]);

  // if fails, reset button to default state
  useEffect(() => {
    setIsSubmitting(false);
  }, [errorMessage]);

  const handleSubmit = e => {
    e.preventDefault();

    setIsSubmitting(true);
    const updatedPost = {
      // ...post,
      // don't need to copy old post here because patch request
      _id,
      title: postTitleValue,
      description: postDescriptionValue,
      body: postBodyValue,
    };

    updatePost(updatedPost);
  };

  if (postSuccess) {
    return (
      <p className="text-center" aria-live="assertive">
        Post Edited! Navigating back to posts . . .{' '}
      </p>
    );
  }

  return (
    <React.Fragment>
      <Prompt
        // launch when values are diff from initial values
        when={
          postTitleValue !== title ||
          postDescriptionValue !== description ||
          postBodyValue !== body
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

EditPostForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string,
    }),
  }),
  history: PropTypes.object.isRequired,
  post: postType,
  updatePost: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  postSuccess: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params),
  postSuccess: state.communication.posts.success,
  errorMessage: state.communication.posts.errorMessage,
});

export default withRouter(
  connect(mapStateToProps, { updatePost })(EditPostForm)
);
