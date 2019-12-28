import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ title, description, author, date, authorSlug, postSlug }) {
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
        <span className="card__small-print">
          Written by:{' '}
          <Link
            to={`/authors/${authorSlug}`}
            className="text-accent relative z-10"
          >
            {author}
          </Link>
        </span>
        <time className="card__small-print">{date}</time>
      </div>
    </article>
  );
}

Card.propTypes = {};

export default Card;
