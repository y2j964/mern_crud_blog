import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavbarBrand() {
  return (
    <NavLink
      to={'/'}
      exact
      className={`navbar__link font-logo`}
      activeClassName={`navbar__link--is-active`}
    >
      SITENAME
    </NavLink>
  );
}
