import React from 'react';
import uuid from 'uuid';
import FooterItem from './FooterItem';

const footerItemsData = [
  {
    text: 'Item 1',
    id: uuid.v4(),
  },
  {
    text: 'Item 2',
    id: uuid.v4(),
  },
  {
    text: 'Item 3',
    id: uuid.v4(),
  },
];
function FooterItems() {
  const footerItemFrags = footerItemsData.map(link => {
    const { id, ...otherProps } = link;
    return <FooterItem key={id} {...otherProps} />;
  });
  return <React.Fragment>{footerItemFrags}</React.Fragment>;
}

export default FooterItems;
