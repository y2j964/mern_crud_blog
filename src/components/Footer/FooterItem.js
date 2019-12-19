import React from 'react';
import PropTypes from 'prop-types';

export default function FooterItem({ href, text }) {
  return (
    <li className="mr-5">
      <a href={href} className="text-xs">
        {text}
      </a>
    </li>
  );
}

FooterItem.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
