import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignUpTrigger() {
  return (
    <NavLink
      to={'/signup'}
      className="navbar__link mr-5"
      activeClassName={'navbar__link--is-active'}
    >
      SIGN UP
    </NavLink>
  );
}
