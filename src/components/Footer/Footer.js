import React from 'react';
import FooterItems from './FooterItems';

export default function Footer() {
  return (
    <footer className="p-4" id="footer">
      <ul className="flex justify-center flex-wrap">
        <FooterItems />
      </ul>
    </footer>
  );
}
