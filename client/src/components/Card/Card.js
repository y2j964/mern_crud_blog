/* eslint-disable react/display-name */
// this is for confirmAlert; I follow the implementation laid out by the docs

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import Close from '../../icons/Close';
import Edit from '../../icons/Edit';
import { deletePost } from '../../actions/postActions';
import DeleteConfirmation from '../DeleteConfirmation';

const formatter = new Intl.DateTimeFormat('en-us', {
  month: 'long',
  day: 'numeric',
});

function Card({
  title,
  description,
  author,
  date,
  _id,
  authorSlug,
  postSlug,
  isEditable,
  // eslint-disable-next-line no-shadow
  deletePost,
}) {
  const dateFull = new Date(date);

  const handleDelete = () => {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => (
        <DeleteConfirmation
          onClose={onClose}
          deletePost={deletePost}
          id={_id}
        />
      ),
    });
  };

  return (
    <article className="card">
      <div className="card__img-container">
        <img className="card__img" src="" alt="" />
      </div>
      <div className="card__body">
        <h2 className="card__title">
          <Link to={`/posts/${postSlug}`} className="a-pseudo-wrap">
            {title}
          </Link>
        </h2>
        <p className="mb-4">{description}</p>
        {isEditable ? (
          <div className="flex justify-around">
            <Link
              to={`/edit-posts/${postSlug}`}
              className="p-2 relative z-10"
              aria-label="edit post"
            >
              <Edit />
            </Link>
            <button
              className="p-2 relative z-10"
              aria-label="delete post"
              onClick={handleDelete}
            >
              <Close fill="#e60000" />
            </button>
          </div>
        ) : (
          <React.Fragment>
            <span className="card__small-print">
              Written by:{' '}
              <Link
                to={`/authors/${authorSlug}`}
                // to={{ pathname: `/authors/${authorSlug}`, author }}
                className="text-accent relative z-10"
              >
                {author}
              </Link>
            </span>
            <time className="card__small-print" dateTime={date}>
              {formatter.format(dateFull)}
            </time>
          </React.Fragment>
        )}
      </div>
    </article>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  _id: PropTypes.string,
  authorSlug: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(Card);
