import React, { useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef();
  useEffect(() => {
    document.title = 'About - MERN Crud Blog';
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
        About
      </h1>
      <p className="mb-4">
        This website is the brain child of Justin Mooney. So he can write
        anything he wants on this site, and you'll just have to read it. Or not.
        You don't <span className="italic">have</span> to read it. In fact,
        Justin's role isn't really as exclusive as we made it to be, because
        you, too, reader, can contribute your own posts that people can
        optionally read. I'm Justin by the way. I'm writing this.
      </p>
      <p>
        But yeah, if you create a free account, you can write your own blog
        posts, and they will update to the page. We won't even send you emails,
        because we aren't sophisticated enough to do that.
      </p>
    </main>
  );
}
