import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../selectors/postSelectors';
import { updatePost } from '../actions/postActions';
import { generateSlug } from '../utilityFunctions/generateSlug';
import { InputText } from '../components/Input';
import TextArea from '../components/TextArea';
import { postType } from '../components/Card/types';

function EditPostAuthenticated({
  history,
  post,
  // eslint-disable-next-line no-shadow
  updatePost,
  // eslint-disable-next-line no-shadow
  postSuccess,
}) {
  const { title, description, body, _id } = post || '';
  // need to use || so that it doesn't throw an error after submission is successful

  const [postTitleValue, setPostTitleValue] = useState(title);
  const [postDescriptionValue, setPostDescriptionValue] = useState(description);
  const [postBodyValue, setPostBodyValue] = useState(body);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (postSuccess) {
        history.push('/edit-posts');
        // redirect to main edit page if successful submission
      }
    }, 1000);
  }, [postSuccess, history]);

  const onSubmit = e => {
    e.preventDefault();

    setIsSubmitting(true);
    const updatedPost = {
      // ...post,
      // don't need to copy old post here because patch request
      _id,
      title: postTitleValue,
      description: postDescriptionValue,
      body: postBodyValue,
      postSlug: generateSlug(postTitleValue),
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
          disabled={isSubmitting}
        >
          {!isSubmitting ? 'Submit' : 'Pending . . .'}
        </button>
      </form>
    </React.Fragment>
  );
}

EditPostAuthenticated.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string,
    }),
  }),
  history: PropTypes.object.isRequired,
  post: postType,
  updatePost: PropTypes.func.isRequired,
  postSuccess: PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params),
  postSuccess: state.communication.posts.success,
});

export default withRouter(
  connect(mapStateToProps, { updatePost })(EditPostAuthenticated)
);
