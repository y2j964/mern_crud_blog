import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ title, description, author, date }) {
  return (
    <article className="card">
      <div className="card__img-container">
        <img className="card__img" src="" alt="" />
      </div>
      <div className="card__body">
        <h2 className="card__title">
          <Link to="/posts/7u1ijfjadn3" className="a-pseudo-wrap">
            {title}
          </Link>
        </h2>
        <p className="mb-4">{description}</p>
        <span className="card__small-print">
          Written by:{' '}
          <Link to="/authors/isdfjnv9249" className="text-accent relative z-10">
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
