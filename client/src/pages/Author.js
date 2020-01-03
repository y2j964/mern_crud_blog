import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByAuthor } from '../selectors/postSelectors';
import { postsType } from '../components/Card/types';
import CardGroup from '../components/Card/CardGroup';

function Author({ match, posts }) {
  const ref = useRef();

  const { author } = posts[0];

  useEffect(() => {
    document.title = `${author} - MERN Crud Blog`;
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

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

// import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { postType } from '../components/Card/types';
// import CardGroup from '../components/Card/CardGroup';
// import PostsByAuthor from '../components/PostsByAuthor';

// function Author({ location, match }) {
//   const ref = useRef();
//   useEffect(() => {
//     document.title = `${location.author} - MERN Crud Blog`;
//     // focus h1 on route change to let screen reader know we changed route
//     ref.current.focus();
//   }, []);

//   return (
//     <main>
//       <h1
//         tabIndex="-1"
//         ref={ref}
//         className="text-4xl py-8 text-center font-bold"
//       >
//         Posts by {location.author}
//       </h1>
//       <PostsByAuthor authorSlug={match.params.authorSlug}>
//         {posts => <CardGroup posts={posts} />}
//       </PostsByAuthor>
//     </main>
//   );
// }

// Author.propTypes = {};

// export default Author;
