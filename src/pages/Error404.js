import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
  const ref = useRef();
  useEffect(() => {
    document.title = '404 Error - PUT SITE TITLE HERE';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);
  return (
    <main>
      <h1 tabIndex="-1" ref={ref}>
        404 Error: Page Not Found
      </h1>
      <Link to={'/'} className="mt-6 text-white border-white border px-2 py-1">
        Home
      </Link>
    </main>
  );
}
