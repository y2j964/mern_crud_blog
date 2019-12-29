import React, { useState, useEffect } from 'react';
import Card from './Card';
import { connect } from 'react-redux';

function CardGroup({ isEditable, posts }) {
  const postFrags = posts.items.map(
    ({ title, author, description, date, authorSlug, postSlug }) => (
      <Card
        title={title}
        description={description}
        author={author}
        date={date}
        authorSlug={authorSlug}
        postSlug={postSlug}
        isEditable={isEditable}
      />
    )
  );
  return <div className="flex flex-col items-center">{postFrags}</div>;
}

const mapStateToProps = state => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(CardGroup);
// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import { getPosts } from '../../actions/postActions';
// import { connect } from 'react-redux';
// import WithLoadingIndicator from '../WithLoadingIndicator';

// function CardGroup({ posts, getPosts }) {
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     getPosts();
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   }, [getPosts]);

//   const postFrags = posts.items.map(
//     ({ title, author, description, date, authorSlug, postSlug }) => (
//       <Card
//         title={title}
//         description={description}
//         author={author}
//         date={date}
//         authorSlug={authorSlug}
//         postSlug={postSlug}
//       />
//     )
//   );
//   return (
//     <div className="flex flex-col items-center">
//       <WithLoadingIndicator isLoading={isLoading} render={() => postFrags} />
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   posts: state.posts,
// });

// export default connect(mapStateToProps, { getPosts })(CardGroup);
