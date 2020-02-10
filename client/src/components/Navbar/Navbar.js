import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import NavbarPrimaryItems from './NavbarPrimaryItems';
import Logout from '../Logout';
import SearchBoxTrigger from '../SearchBox/SearchBoxTrigger';
import AccentButton from '../AccentButton';
import ButtonLink from '../ButtonLink';
import SearchModal from '../SearchModal';

function Navbar({
  collapsibleNavIsExpanded,
  toggleCollapsibleNav,
  setAuthModalPosition,
  isAuthenticated,
  children,
}) {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const openSearchModal = () => setIsSearchBoxOpen(true);

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
      <NavbarPrimaryItems
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        openSearchModal={openSearchModal}
      />
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
        <SearchBoxTrigger
          openSearchModal={openSearchModal}
          isSearchBoxOpen={isSearchBoxOpen}
        />
        <CSSTransition
          in={isSearchBoxOpen}
          timeout={{ enter: 150, exit: 300 }}
          unmountOnExit
          classNames="fade"
        >
          <SearchModal
            isOpen={isSearchBoxOpen}
            handleClose={() => setIsSearchBoxOpen(false)}
          />
        </CSSTransition>
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
