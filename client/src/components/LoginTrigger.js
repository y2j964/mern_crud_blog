import React from 'react';

export default function LoginTrigger({ children, additionalClasses }) {
  return (
    <button className={`navbar__link ${additionalClasses || ''}`}>
      {children}
    </button>
  );
}
