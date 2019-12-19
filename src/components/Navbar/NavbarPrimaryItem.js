import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavbarPrimaryItem({
  children,
  slug,
  additionalClasses,
}) {
  return (
    <li>
      <NavLink
        to={`/${slug}`}
        className={`navbar__link collapsible-group__item ${additionalClasses}`}
        activeClassName={'navbar__link--is-active'}
      >
        {children}
      </NavLink>
    </li>
  );
}

NavbarPrimaryItem.propTypes = {
  children: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
  additionalClasses: PropTypes.string,
};
