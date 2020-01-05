/* eslint-disable react/display-name */
// this is for confirmAlert; I follow the implementation laid out by the docs

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import Modal from '../Modal';
import Close from '../../icons/Close';
import Edit from '../../icons/Edit';
import { deletePost } from '../../actions/postActions';

function Card({
  title,
  description,
  author,
  date,
  authorSlug,
  postSlug,
  isEditable,
  // eslint-disable-next-line no-shadow
  deletePost,
}) {
  const handleDelete = () => {
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => {
        return (
          <Modal handleClose={onClose}>
            <div className="mt-6 z-10">
              <h2
                className="font-bold text-2xl text-center mb-5"
                id="modalHeading"
              >
                Confirm Delete
              </h2>
              <p className="mb-5 text-center">
                This action is irreversible. Are you sure you want to delete
                this post?
              </p>
              <div className="flex justify-around">
                <button
                  className="accent-btn w-24 bg-gray-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="accent-btn w-24 bg-red-600"
                  onClick={() => {
                    deletePost(postSlug);
                    onClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        );
      },
    });
  };
  // const handleDelete = () => {
  //   if (
  //     window.confirm('Deleting posts is irreversible. Do you wish to proceed?')
  //   ) {
  //     deletePost(postSlug);
  //   }
  // };

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
            <time className="card__small-print">{date}</time>
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
  id: PropTypes.string,
  authorSlug: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(Card);
