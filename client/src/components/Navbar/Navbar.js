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
  setAuthModalPosition,
  isAuthenticated,
}) {
  return (
    <nav className="navbar">
      <HamburgerToggle
        controls="navbarCollapsibleGroup"
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        handleClick={() => {
          document.getElementById('navbarCollapsibleGroup').style.transition =
            'transition: height .3s ease-in-out, visibility .3s ease-in-out';
          toggleCollapsibleNav();
        }}
      />
      <NavbarBrand />
      <NavbarPrimaryItems collapsibleNavIsExpanded={collapsibleNavIsExpanded} />
      <div className="ml-auto flex items-center order-2 md:order-3">
        {isAuthenticated ? (
          <Logout additionalClasses="pseudo-underline mr-2 sm:mr-5" />
        ) : (
          <AuthModalTrigger
            additionalClasses="pseudo-underline mr-2 sm:mr-5"
            handleClick={() => setAuthModalPosition('login')}
          >
            Log In
          </AuthModalTrigger>
        )}
        <AuthModalTrigger
          additionalClasses="accent-btn accent-btn--is-glowing mr-0 my-0 px-2 py-1 sm:px-3 sm:py-2"
          handleClick={() => setAuthModalPosition('register')}
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
  setAuthModalPosition: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
