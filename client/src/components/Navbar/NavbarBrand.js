import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavbarBrand() {
  return (
    <NavLink
      to={'/'}
      exact
      className={`navbar__link pseudo-underline font-logo`}
      activeClassName={`navbar__link--is-active`}
    >
      Crud Blog
    </NavLink>
  );
}
