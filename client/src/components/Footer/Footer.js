import React from 'react';
import FooterItems from './FooterItems';

function Footer() {
  return (
    <footer className="p-4" id="footer">
      <ul className="flex justify-center flex-wrap">
        <FooterItems />
      </ul>
    </footer>
  );
}

export default Footer;