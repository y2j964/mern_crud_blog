import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import NavbarPrimaryItems from './NavbarPrimaryItems';
import Logout from '../Logout';
import SearchBoxTrigger from '../SearchBox/SearchBoxTrigger';
import SearchBox from '../SearchBox/SearchBox';
import AccentButton from '../AccentButton';
import ButtonLink from '../ButtonLink';

function Navbar({
  collapsibleNavIsExpanded,
  toggleCollapsibleNav,
  setAuthModalPosition,
  isAuthenticated,
  children,
}) {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const toggleIsSearchBoxOpen = () => setIsSearchBoxOpen(!isSearchBoxOpen);

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
      <div className="ml-auto flex items-center order-2 md:order-3 relative">
        {isAuthenticated ? (
          <Logout additionalClasses="pseudo-underline mr-2 sm:mr-5" />
        ) : (
          <React.Fragment>
            <ButtonLink
              additionalClasses="hidden md:block mr-2 sm:mr-3"
              handleClick={() => setAuthModalPosition('login')}
              dataTestId="desktopLoginModalBtn"
            >
              Log in
            </ButtonLink>
            <AccentButton
              additionalClasses="navbar__link hidden md:block mr-1"
              handleClick={() => setAuthModalPosition('register')}
              dataTestId="desktopRegisterModalBtn"
            >
              Register
            </AccentButton>
          </React.Fragment>
        )}
        {children}
        <SearchBox
          isSearchBoxOpen={isSearchBoxOpen}
          additionalClasses={`search-box ${
            isSearchBoxOpen ? 'search-box--is-open' : ''
          }`}
        />
        <SearchBoxTrigger
          toggleIsSearchBoxOpen={toggleIsSearchBoxOpen}
          isSearchBoxOpen={isSearchBoxOpen}
        />
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  collapsibleNavIsExpanded: PropTypes.bool.isRequired,
  toggleCollapsibleNav: PropTypes.func.isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
