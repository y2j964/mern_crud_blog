import React, { useEffect, useRef } from 'react';

export default function Author() {
  const ref = useRef();
  useEffect(() => {
    document.title = 'Author - MERN Crud Blog';
    // focus h1 on route change to let screen reader know we changed route
    ref.current.focus();
  }, []);
  return (
    <main>
      <h1
        tabIndex="-1"
        ref={ref}
        className="text-4xl pt-8 text-center font-bold"
      >
        Posts by SOME AUTHOR
      </h1>
    </main>
  );
}
