import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { getPost } from '../selectors/postSelectors';
import { postType } from '../components/Card/types';

const formatter = new Intl.DateTimeFormat('en-us', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
});

function Post({ post }) {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Blog Post - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  const { title, description, author, date, body, authorSlug } = post;
  const dateFull = new Date(date);

  return (
    <main className="max-w-3xl mx-auto">
      <header className="text-center pb-4">
        <h1
          className="font-bold text-4xl pt-8 pb-6 capitalize"
          tabIndex="-1"
          ref={ref}
        >
          {title}
        </h1>
        <p className="mb-2">{description}</p>
        <Link to={`/authors/${authorSlug}`} className="text-sm text-accent">
          {author}
        </Link>
        <span className="text-sm"> | </span>
        <time className="text-sm" dateTime={date}>
          {formatter.format(dateFull)}
        </time>
        {/* <div className="w-full h-64 mt-3 bg-gray-200"></div> */}
      </header>
      <ReactQuill value={JSON.parse(body).ops} theme="bubble" readOnly={true} />
    </main>
  );
}

Post.propTypes = {
  post: postType,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params),
});

export default connect(mapStateToProps)(Post);
