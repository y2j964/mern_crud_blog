import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPostById } from '../selectors/postSelectors';
import { updatePost } from '../actions/postActions';
import Input, { InputText } from './Input';
import { postType } from './Card/types';
import WithErrorNotification from './WithErrorNotification';
import { AccentButton } from './Button/Button';

const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
];

function EditPostForm({
  history,
  post,
  // eslint-disable-next-line no-shadow
  updatePost,
  // eslint-disable-next-line no-shadow
  postSuccess,
  errorMessage,
}) {
  const quillRef = useRef();
  const editor = useRef();
  const unprivilegedEditor = useRef();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => {
            const range = unprivilegedEditor.current.getSelection(true);
            const value = prompt('What is the image URL');
            if (value) {
              editor.current.insertEmbed(
                range.index,
                'imageAlt',
                value,
                Quill.sources.USER
              );
            }
          },
        },
      },
    }),
    []
  );

  useEffect(() => {
    editor.current = quillRef.current.getEditor();
    unprivilegedEditor.current = quillRef.current.makeUnprivilegedEditor(
      editor.current
    );
  }, []);

  const { title, description, thumbnailImage, body, _id } = post || '';
  // need to use || so that it doesn't throw an error after submission is successful

  const [postTitleValue, setPostTitleValue] = useState(title);
  const [postDescriptionValue, setPostDescriptionValue] = useState(description);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState(thumbnailImage);
  const [postBodyValue, setPostBodyValue] = useState(JSON.parse(body).ops);
  const [quillError, setQuillError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // redirect back to home if post succeeded
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (postSuccess) {
        history.push('/edit-posts');
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

    if (unprivilegedEditor.current.getText().length <= 1) {
      setQuillError("Please add text to the post's body");

      const scrolledDestination =
        document.querySelector('[role="alert"]') ||
        document.querySelector('.quill');
      // these querySelectors equate to the same thing; when the role isn't visible
      // (it's instantiation),  it will get instantiated in the very spot that quill is

      // when the error is present and it isn't visible on the screen, scroll to that error . . .
      window.scrollTo({
        top: window.scrollY + scrolledDestination.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth',
      });

      setIsSubmitting(false);
      return;
    }
    // reset error if present
    setQuillError('');

    const updatedBody = JSON.stringify(
      unprivilegedEditor.current.getContents()
    );

    setIsSubmitting(true);
    const updatedPost = {
      // ...post,
      // don't need to copy old post here because patch request
      _id,
      title: postTitleValue,
      description: postDescriptionValue,
      thumbnailImage: thumbnailImageUrl,
      body: updatedBody,
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
      <Link
        to="/post-preview"
        target="_blank"
        className="underline text-blue-500 block mb-4"
      >
        Default Post Preview
      </Link>
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
        <Input
          labelText={'Thumbnail Image: '}
          name="thumbnailImageUrl"
          isRequired={true}
          type="url"
          placeholder="https://images.unsplash.com/photo-11"
          value={thumbnailImageUrl}
          describedBy="imageThumbnailDetails"
          handleChange={e => setThumbnailImageUrl(e.target.value)}
        >
          <small className="sr-only" id="imageThumbnailDetails">
            Image must be a url (e.g., https://images.unsplash.com/photo-11)
          </small>
        </Input>
        <div className="flex max-w-sm sm:max-w-2xl xl:max-w-3xl">
          <div className="w-1/3 mb-4">
            <div className="ratio-16-9 bg-gray-200" style={{ height: '148px' }}>
              <img src={thumbnailImageUrl} alt="" />
            </div>
          </div>
        </div>
        <WithErrorNotification error={quillError} />
        <ReactQuill
          ref={quillRef}
          onChange={html => setPostBodyValue(html)}
          modules={modules}
          value={postBodyValue}
          placeholder={
            'Enter post body here. We recommend starting with an image, possibly the thumbnail image.'
          }
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
  post: getPostById(state, props.match.params),
  postSuccess: state.communication.posts.success,
  errorMessage: state.communication.posts.errorMessage,
});

export default withRouter(
  connect(mapStateToProps, { updatePost })(EditPostForm)
);
