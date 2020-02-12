import React from 'react';
import uuid from 'uuid';
import FooterItem from './FooterItem';

const footerItemsData = [
  {
    text: 'Link 1',
    href: 'https://www.google.com/',
    id: uuid.v4(),
  },
  {
    text: 'Link 2',
    href: 'https://www.google.com/',
    id: uuid.v4(),
  },
  {
    text: 'Link 3',
    href: 'https://www.google.com/',
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