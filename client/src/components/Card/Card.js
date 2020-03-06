import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/postActions';
import Close from '../../icons/Close';
import Edit from '../../icons/Edit';
import DeleteConfirmation from '../DeleteConfirmation';

const formatter = new Intl.DateTimeFormat('en-us', {
  month: 'long',
  day: 'numeric',
});

function Card({
  title,
  description,
  thumbnailImage,
  author,
  date,
  _id,
  authorSlug,
  postSlug,
  isEditable,
  // eslint-disable-next-line no-shadow
  deletePost,
  // eslint-disable-next-line no-shadow
}) {
  const dateFull = new Date(date);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <React.Fragment>
      <li className="w-full">
        <article className="card">
          <div className="card__img-container">
            <img className="card__img" src={thumbnailImage} alt="" />
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
                  to={`/edit-posts/${_id}`}
                  className="p-2 relative z-10"
                  aria-label="edit post"
                >
                  <Edit />
                </Link>
                <button
                  className="p-2 relative z-10"
                  aria-label="delete post"
                  onClick={() => setIsConfirmationOpen(true)}
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
      </li>
      {isConfirmationOpen && (
        <DeleteConfirmation
          handleClose={() => setIsConfirmationOpen(false)}
          deletePost={() => deletePost(_id)}
        />
      )}
    </React.Fragment>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  _id: PropTypes.string,
  authorSlug: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(Card);
