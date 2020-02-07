import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import NavbarPrimaryItem from './NavbarPrimaryItem';
import SearchBox from '../SearchBox/SearchBox';
import SearchGlass from '../../icons/SearchGlass';

const navbarPrimaryItemsData = [
  {
    text: 'Add Post',
    slug: 'add-post',
    id: uuid.v4(),
  },
  {
    text: 'Edit Posts',
    slug: 'edit-posts',
    id: uuid.v4(),
  },
  {
    text: 'About',
    slug: 'about',
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
      <li className="flex items-center md:hidden">
        <SearchGlass fill="black" additionalClasses="mr-2" />
        <SearchBox
          additionalClasses="search-box-mobile"
          searchInputId="searchInputMobile"
        />
      </li>
    </ul>
  );
}

NavbarPrimaryItems.propTypes = {
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
};
