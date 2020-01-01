import React from 'react';

export default function AuthModalTrigger({
  handleClick,
  children,
  additionalClasses,
}) {
  return (
    <button
      className={`navbar__link ${additionalClasses || ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
