import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByAuthor } from '../selectors/postSelectors';
import { postsType } from '../components/Card/types';
import CardGroup from '../components/Card/CardGroup';

// eslint-disable-next-line no-unused-vars
function Author({ match, posts }) {
  const ref = useRef();

  const { author } = posts[0];

  useEffect(() => {
    document.title = `${author} - MERN Crud Blog`;
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, [author]);

  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className="text-4xl py-8 text-center font-bold"
      >
        Posts by {author}
      </h1>
      <CardGroup posts={posts} />
    </main>
  );
}

Author.propTypes = {
  posts: postsType,
  match: PropTypes.shape({
    params: PropTypes.shape({
      authorSlug: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  posts: getPostsByAuthor(state, props.match.params),
});

export default connect(mapStateToProps)(Author);
