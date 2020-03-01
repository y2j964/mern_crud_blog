import React from 'react';
import PropTypes from 'prop-types';

function FooterItem({ text }) {
  return <li className="mr-5 text-xs">{text}</li>;
}

FooterItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FooterItem;
