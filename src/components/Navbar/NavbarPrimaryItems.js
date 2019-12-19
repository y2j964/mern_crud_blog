import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import NavbarPrimaryItem from './NavbarPrimaryItem';

const navbarPrimaryItemsData = [
  {
    text: 'Link 1',
    slug: 'link-1',
    id: uuid.v4(),
  },
  {
    text: 'Link 2',
    slug: 'link-2',
    id: uuid.v4(),
  },
  {
    text: 'Link 3',
    slug: 'link-3',
    id: uuid.v4(),
  },
];

export default function NavbarPrimaryItems({ collapsibleNavIsExpanded }) {
  const navbarPrimaryItemsFrags = navbarPrimaryItemsData.map(item => {
    return (
      <NavbarPrimaryItem key={item.id} slug={item.slug}>
        {item.text}
      </NavbarPrimaryItem>
    );
  });

  return (
    <ul
      className={`collapsible-group${
        collapsibleNavIsExpanded ? ' collapsible-group--is-expanded' : ''
      }`}
      id="navbarCollapsibleGroup"
    >
      {navbarPrimaryItemsFrags}
    </ul>
  );
}

NavbarPrimaryItems.propTypes = {
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
};
