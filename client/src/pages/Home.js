// import React, { useEffect, useRef } from 'react';
// import AllPosts from '../components/AllPosts';
// import CardGroup from '../components/Card/CardGroup';
// import { connect } from 'react-redux';

// function Home({ posts }) {
//   const ref = useRef();

//   useEffect(() => {
//     document.title = 'MERN Crud Blog';
//     // focus h1 on route change to let screen reader know we changed route
//     ref.current.focus();
//   }, []);

//   return (
//     <main>
//       <header className="py-8">
//         <h1 tabIndex="-1" ref={ref} className="text-4xl text-center font-bold">
//           Blog Posts
//         </h1>
//       </header>
//       <AllPosts>
//         <CardGroup posts={posts} />
//       </AllPosts>
//     </main>
//   );
// }

// const mapStateToProps = state => ({
//   posts: state.posts,
// });

// export default connect(mapStateToProps)(Home);

import React, { useEffect, useRef } from 'react';
import AllPosts from '../components/AllPosts';
import CardGroup from '../components/Card/CardGroup';

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    document.title = 'MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  return (
    <main>
      <header className="py-8">
        <h1 tabIndex="-1" ref={ref} className="text-4xl text-center font-bold">
          Blog Posts
        </h1>
      </header>
      <AllPosts>{posts => <CardGroup posts={posts} />}</AllPosts>
    </main>
  );
}
