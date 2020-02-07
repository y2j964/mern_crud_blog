import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavbarBrand() {
  return (
    <div
      className="flex-1 self-center md:flex-none md:self-auto text-center"
      style={{ marginRight: '-2px' }}
    >
      {/* the user icon is 2px wider than hamburger icon, so we need to offset the brand with 2px */}
      <NavLink
        to={'/'}
        exact
        className={`navbar__link pseudo-underline navbar__link--is-active inline-block text-base`}
        activeClassName={`navbar__link--is-active`}
      >
        Crud Blog
      </NavLink>
    </div>
  );
}
