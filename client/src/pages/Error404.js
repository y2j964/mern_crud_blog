import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  const ref = useRef();
  useEffect(() => {
    document.title = '404 Error - MERN CRUD Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);
  return (
    <main>
      <h1 tabIndex="-1" ref={ref} className="page-heading page-heading--is-lax">
        404 Error: Page Not Found
      </h1>
      <p className="mb-6">
        I don&apos;t know how, but we&apos;ve strayed a little too far from the
        beaten path.
      </p>
      <Link to={'/'} className="btn btn--inverse">
        Take Me Home
      </Link>
    </main>
  );
}

export default Error404;
