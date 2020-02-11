import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import CollapsibleGroupItem from './CollapsibleGroupItem';
import ButtonLink from '../ButtonLink';

const collapsibleGroupItemsData = [
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

export default function CollapsibleGroup({
  collapsibleNavIsExpanded,
  openSearchModal,
}) {
  const collapsibleGroupItemsFrags = collapsibleGroupItemsData.map(item => {
    return (
      <CollapsibleGroupItem key={item.id} slug={item.slug}>
        {item.text}
      </CollapsibleGroupItem>
    );
  });

  return (
    <ul
      className={`collapsible-group${
        collapsibleNavIsExpanded ? ' collapsible-group--is-expanded' : ''
      }`}
      id="navbarCollapsibleGroup"
    >
      {collapsibleGroupItemsFrags}
      <li className="flex items-center md:hidden">
        <ButtonLink handleClick={openSearchModal} dataTestId="searchMobile">
          Search
        </ButtonLink>
      </li>
    </ul>
  );
}

CollapsibleGroup.propTypes = {
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
  openSearchModal: PropTypes.func.isRequired,
};
