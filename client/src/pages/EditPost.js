import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../selectors/postSelectors';
import { updatePost } from '../actions/postActions';
import { generateSlug } from '../utilityFunctions/generateSlug';
import { InputText } from '../components/Input';
import TextArea from '../components/TextArea';
import { postType } from '../components/Card/types';

// eslint-disable-next-line no-shadow
function EditPost({ post, updatePost, history }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'POST TITLE - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  const { title, description, body } = post || '';
  // need to use || so that it doesn't throw an error after submission is successful

  const [postTitleValue, setPostTitleValue] = useState(title);
  const [postDescriptionValue, setPostDescriptionValue] = useState(description);
  const [postBodyValue, setPostBodyValue] = useState(body);
  const [submissionSuccess, setSubmissionSuccess] = useState();

  useEffect(() => {
    setTimeout(() => {
      if (submissionSuccess) {
        history.push('/edit-posts');
        // redirect to main edit page if successful submission
      }
    }, 1000);
  }, [submissionSuccess, history]);

  const onSubmit = e => {
    e.preventDefault();

    const updatedPost = {
      // ...post,
      // don't need to copy old post here because patch request
      title: postTitleValue,
      description: postDescriptionValue,
      body: postBodyValue,
      postSlug: generateSlug(postTitleValue),
    };

    console.log(updatedPost);

    updatePost(updatedPost);
    setSubmissionSuccess(true);
  };

  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className="text-4xl py-8 text-center font-bold"
      >
        Post Title
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
          Post Edited! Navigating back to posts . . .{' '}
        </p>
      )}
    </main>
  );
}

EditPost.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string,
    }),
  }),
  history: PropTypes.object.isRequired,
  post: postType,
  updatePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params),
});

export default connect(mapStateToProps, { updatePost })(withRouter(EditPost));
