import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function CollapsibleGroupItem({ children, slug, additionalClasses }) {
  return (
    <li>
      <NavLink
        to={`/${slug}`}
        className={`navbar__link collapsible-group__item pseudo-underline ${additionalClasses ||
          ''}`}
        activeClassName={'navbar__link--is-active'}
      >
        {children}
      </NavLink>
    </li>
  );
}

CollapsibleGroupItem.propTypes = {
  children: PropTypes.node.isRequired,
  slug: PropTypes.string.isRequired,
  additionalClasses: PropTypes.string,
};

export default CollapsibleGroupItem;
