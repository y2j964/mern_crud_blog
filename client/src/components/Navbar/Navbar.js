import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import NavbarPrimaryItems from './NavbarPrimaryItems';
import AuthModalTrigger from '../AuthModalTrigger';
import Logout from '../Logout';

function Navbar({
  collapsibleNavIsExpanded,
  toggleCollapsibleNav,
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  isAuthenticated,
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
        {isAuthenticated ? (
          <Logout additionalClasses="pseudo-underline mr-5" />
        ) : (
          <AuthModalTrigger
            additionalClasses="pseudo-underline mr-5"
            handleClick={() => setIsLoginModalOpen(true)}
          >
            Log In
          </AuthModalTrigger>
        )}
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
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
