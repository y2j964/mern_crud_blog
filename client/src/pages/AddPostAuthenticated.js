import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import { getName, getAuthorSlug } from '../selectors/sessionSelector';
import { generateSlug } from '../utilityFunctions/generateSlug';
import { InputText } from '../components/Input';
import TextArea from '../components/TextArea';

// eslint-disable-next-line no-shadow
function AddPostAuthenticated({ history, addPost, name, authorSlug, errorId }) {
  const [postTitleValue, setPostTitleValue] = useState('');
  const [postDescriptionValue, setPostDescriptionValue] = useState('');
  const [postBodyValue, setPostBodyValue] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState();
  const [isLoading, setIsLoading] = useState();

  // redirect back to home if post succeeded
  useEffect(() => {
    setTimeout(() => {
      if (submissionSuccess && errorId !== 'POST_FAIL') {
        history.push('/');
      }
    }, 1000);
  }, [submissionSuccess, history]);

  const onSubmit = e => {
    // name will come from redux auth
    e.preventDefault();
    const post = {
      title: postTitleValue,
      description: postDescriptionValue,
      body: postBodyValue,
      author: name,
      authorSlug,
      postSlug: generateSlug(postTitleValue),
    };

    addPost(post);
    setSubmissionSuccess(true);
  };

  if (submissionSuccess && errorId !== 'POST_FAIL') {
    return (
      <p className="text-center" aria-live="polite">
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
      <form action="" onSubmit={onSubmit}>
        {errorId === 'POST_FAIL' && (
          <div
            className="bg-red-200 mb-3 p-3 rounded-sm flex items-center"
            role="alert"
          >
            <p className="text-sm text-red-800 font-bold">{errorId}</p>
          </div>
        )}
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
    </React.Fragment>
  );
}

AddPostAuthenticated.propTypes = {
  addPost: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  authorSlug: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  name: getName(state),
  authorSlug: getAuthorSlug(state),
  errorId: state.communication.id,
});

export default withRouter(
  connect(mapStateToProps, { addPost })(AddPostAuthenticated)
);
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { withRouter, Prompt } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { addPost } from '../actions/postActions';
// import { getName, getAuthorSlug } from '../selectors/sessionSelector';
// import { generateSlug } from '../utilityFunctions/generateSlug';
// import { InputText } from '../components/Input';
// import TextArea from '../components/TextArea';

// // eslint-disable-next-line no-shadow
// function AddPostAuthenticated({ history, addPost, name, authorSlug, errorId }) {
//   const [postTitleValue, setPostTitleValue] = useState('');
//   const [postDescriptionValue, setPostDescriptionValue] = useState('');
//   const [postBodyValue, setPostBodyValue] = useState('');
//   const [submissionSuccess, setSubmissionSuccess] = useState();
//   const [isLoading, setIsLoading] = useState();

//   // redirect back to home if post succeeded
//   useEffect(() => {
//     setTimeout(() => {
//       if (submissionSuccess && errorId !== 'POST_FAIL') {
//         history.push('/');
//       }
//     }, 1000);
//   }, [submissionSuccess, history]);

//   const onSubmit = e => {
//     // name will come from redux auth
//     e.preventDefault();
//     const post = {
//       title: postTitleValue,
//       description: postDescriptionValue,
//       body: postBodyValue,
//       author: name,
//       authorSlug,
//       postSlug: generateSlug(postTitleValue),
//     };

//     addPost(post);
//     setSubmissionSuccess(true);
//   };

//   if (submissionSuccess && errorId !== 'POST_FAIL') {
//     return (
//       <p className="text-center" aria-live="polite">
//         Post Added! Navigating back to posts . . .{' '}
//       </p>
//     );
//   }

//   return (
//     <React.Fragment>
//       <Prompt
//         when={
//           postTitleValue !== '' ||
//           postDescriptionValue !== '' ||
//           postBodyValue !== ''
//         }
//         message={'Changes have not been saved. Are you sure you want to exit?'}
//       />
//       <form action="" onSubmit={onSubmit}>
//         <InputText
//           labelText={'Title: '}
//           name="postTitle"
//           isRequired={true}
//           value={postTitleValue}
//           handleChange={e => setPostTitleValue(e.target.value)}
//         />
//         <InputText
//           labelText={'Description: '}
//           name="postDescription"
//           isRequired={true}
//           value={postDescriptionValue}
//           handleChange={e => setPostDescriptionValue(e.target.value)}
//         />
//         <TextArea
//           labelText={'Body: '}
//           name="postBody"
//           isRequired={true}
//           rows={5}
//           value={postBodyValue}
//           handleChange={e => setPostBodyValue(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="accent-btn accent-btn--is-glowing w-full mt-2"
//         >
//           Submit
//         </button>
//       </form>
//     </React.Fragment>
//   );
// }

// AddPostAuthenticated.propTypes = {
//   addPost: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   authorSlug: PropTypes.string.isRequired,
//   history: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   name: getName(state),
//   authorSlug: getAuthorSlug(state),
//   errorId: state.error.id,
// });

// export default withRouter(
//   connect(mapStateToProps, { addPost })(AddPostAuthenticated)
// );