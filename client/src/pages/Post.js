import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { getPostBySlug } from '../selectors/postSelectors';
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
  const { title, description, author, date, body, authorSlug } = post;
  const dateFull = new Date(date);

  const ref = useRef();
  useEffect(() => {
    document.title = `${title} - MERN CRUD Blog`;
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, [title]);

  return (
    <main className="max-w-3xl mx-auto">
      <header className="text-center pb-4">
        <h1
          className="font-bold text-4xl pt-8 pb-3 capitalize"
          tabIndex="-1"
          ref={ref}
        >
          {title}
        </h1>
        <p className="mb-2 text-lg">{description}</p>
        <Link to={`/authors/${authorSlug}`} className="text-sm text-accent">
          {author}
        </Link>
        <span className="text-sm"> | </span>
        <time className="text-sm" dateTime={date}>
          {formatter.format(dateFull)}
        </time>
      </header>
      <ReactQuill value={JSON.parse(body).ops} theme="bubble" readOnly={true} />
    </main>
  );
}

Post.propTypes = {
  post: postType,
};

const mapStateToProps = (state, props) => ({
  post: getPostBySlug(state, props.match.params),
});

export default connect(mapStateToProps)(Post);
