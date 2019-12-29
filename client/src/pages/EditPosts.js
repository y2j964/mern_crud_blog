import React, { useEffect, useRef } from 'react';
import AllPosts from '../components/AllPosts';
import CardGroup from '../components/Card/CardGroup';

export default function Error404() {
  const ref = useRef();
  useEffect(() => {
    document.title = 'My Posts - MERN Crud Blog';
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
        My Posts
      </h1>
      <AllPosts>
        <CardGroup isEditable />
      </AllPosts>
    </main>
  );
}
