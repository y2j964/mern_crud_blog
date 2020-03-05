import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByAuthor } from '../selectors/postSelectors';
import { postsType } from '../components/Card/types';
import CardGroup from '../components/Card/CardGroup';
import Spinner from '../icons/Spinner';

// eslint-disable-next-line no-unused-vars
function Author({ match, posts }) {
  const ref = useRef();

  useEffect(() => {
    if (posts.length > 0) {
      document.title = `${posts[0].author} - MERN CRUD Blog`;
      // focus h1 on route change to let screen reader know we changed route
      ref.current.focus();
    }
  }, [posts]);

  // this will run on reloads/new tabs while the initial data is fetching
  if (posts.length === 0) {
    return (
      <main className="flex flex-col justify-center">
        <Spinner />
      </main>
    );
  }

  const { author } = posts[0];
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
