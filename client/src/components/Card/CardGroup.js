import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './Card';
import { postsType } from './types';

function CardGroup({ isEditable, posts }) {
  const postFrags = posts.map(
    ({ title, author, description, date, _id, authorSlug, postSlug }) => (
      <CSSTransition key={_id} timeout={300} classNames="fade-away">
        <Card
          title={title}
          description={description}
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
    <TransitionGroup className="flex flex-col items-center">
      {postFrags}
    </TransitionGroup>
  );
}

CardGroup.propTypes = {
  isEditable: PropTypes.bool,
  posts: postsType,
};

export default CardGroup;
