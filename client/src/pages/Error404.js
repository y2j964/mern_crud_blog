import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
  const ref = useRef();
  useEffect(() => {
    document.title = '404 Error - MERN Crud Blog';
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
        404 Error: Page Not Found
      </h1>
      <p className="mb-6">
        I don't know how, but we've strayed a little too far from the beaten
        path.
      </p>
      <Link to={'/'} className="accent-btn accent-btn--inverse">
        Take Me Home
      </Link>
    </main>
  );
}
