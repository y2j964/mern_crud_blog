import React from 'react';
import PropTypes from 'prop-types';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import NavbarPrimaryItems from './NavbarPrimaryItems';
import AuthModalTrigger from '../AuthModalTrigger';

export default function Navbar({
  collapsibleNavIsExpanded,
  toggleCollapsibleNav,
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
}) {
  return (
    <nav className="navbar">
      <NavbarBrand />
      <HamburgerToggle
        controls="navbarCollapsibleGroup"
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        handleClick={() => {
          document.getElementById('navbarCollapsibleGroup').style.transition =
            'transition: height .3s ease-in-out, visibility .3s ease-in-out';
          toggleCollapsibleNav();
        }}
      />
      <NavbarPrimaryItems collapsibleNavIsExpanded={collapsibleNavIsExpanded} />
      <div className="ml-auto hidden md:flex items-center">
        <AuthModalTrigger
          additionalClasses="pseudo-underline mr-5"
          handleClick={() => setIsLoginModalOpen(true)}
        >
          Log In
        </AuthModalTrigger>
        <AuthModalTrigger
          additionalClasses="accent-btn accent-btn--is-glowing mr-0"
          handleClick={() => setIsRegisterModalOpen(true)}
        >
          Register
        </AuthModalTrigger>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
  toggleCollapsibleNav: PropTypes.func.isRequired,
  setIsLoginModalOpen: PropTypes.func.isRequired,
  setIsRegisterModalOpen: PropTypes.func.isRequired,
};
