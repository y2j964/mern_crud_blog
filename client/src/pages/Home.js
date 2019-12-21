import React, { useEffect, useRef } from 'react';

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    document.title = 'PUT TITLE HERE';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);

  return (
    <main>
      <h1 tabIndex="-1" ref={ref}>
        Home Page
      </h1>
    </main>
  );
}
