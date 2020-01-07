import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { postsType } from './types';

function CardGroup({ isEditable, posts }) {
  const postFrags = posts.map(
    ({ title, author, description, date, _id, authorSlug, postSlug }) => (
      <Card
        key={_id}
        title={title}
        description={description}
        author={author}
        date={date}
        _id={_id}
        authorSlug={authorSlug}
        postSlug={postSlug}
        isEditable={isEditable}
      />
    )
  );
  return <div className="flex flex-col items-center">{postFrags}</div>;
}

CardGroup.propTypes = {
  isEditable: PropTypes.bool,
  posts: postsType,
};

export default CardGroup;
