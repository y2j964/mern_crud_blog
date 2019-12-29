import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

const generateSlug = str =>
  str
    .toLowerCase()
    .split(' ')
    .join('-');

function AddPost({ addPost }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Add Post - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  const [postTitleValue, setPostTitleValue] = useState('');
  const [postDescriptionValue, setPostDescriptionValue] = useState('');
  const [postBodyValue, setPostBodyValue] = useState('');

  const onSubmit = e => {
    const name = 'Mark Twain';
    // name will come from redux auth
    e.preventDefault();
    const post = {
      title: postTitleValue,
      description: postDescriptionValue,
      author: name,
      date: 'Friday 3:30PM',
      authorSlug: generateSlug(name),
      postSlug: generateSlug(postTitleValue),
    };

    console.log(post);
    console.log(addPost);
    addPost(post);
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
      <form action="" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="postTitle">
            Title:
          </label>
          <input
            type="text"
            aria-required={true}
            required={true}
            name="postTitle"
            id="postTitle"
            className="form-input"
            value={postTitleValue}
            onChange={e => setPostTitleValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="postDescription">
            Description:
          </label>
          <input
            type="text"
            aria-required={true}
            required={true}
            name="postDescription"
            id="postDescription"
            className="form-input"
            value={postDescriptionValue}
            onChange={e => setPostDescriptionValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="postBody">
            Body:
          </label>
          <textarea
            aria-required={true}
            required={true}
            rows={5}
            name="postBody"
            id="postBody"
            className="form-input"
            value={postBodyValue}
            onChange={e => setPostBodyValue(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="accent-btn accent-btn--is-glowing w-full mt-2"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default connect(null, { addPost })(AddPost);
