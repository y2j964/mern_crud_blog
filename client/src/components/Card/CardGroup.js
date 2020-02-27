import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './Card';
import { postsType } from './types';

function CardGroup({ isEditable, posts }) {
  const postFrags = posts.map(
    ({
      title,
      author,
      description,
      thumbnailImage,
      date,
      _id,
      authorSlug,
      postSlug,
    }) => (
      <CSSTransition key={_id} timeout={300} classNames="fade-away">
        <Card
          title={title}
          description={description}
          thumbnailImage={thumbnailImage}
          author={author}
          date={date}
          _id={_id}
          authorSlug={authorSlug}
          postSlug={postSlug}
          isEditable={isEditable}
        />
      </CSSTransition>
    )
  );
  return (
    <TransitionGroup className="flex flex-col items-center mx-auto max-w-sm sm:max-w-2xl xl:max-w-3xl">
      {postFrags}
    </TransitionGroup>
  );
}

CardGroup.propTypes = {
  isEditable: PropTypes.bool,
  posts: postsType,
};

export default CardGroup;
