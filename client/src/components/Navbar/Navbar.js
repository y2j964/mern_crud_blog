import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import CollapsibleGroup from './CollapsibleGroup';
import SearchModalTrigger from '../SearchBox/SearchModalTrigger';
import { AccentButton } from '../Button/Button';
import ButtonLink from '../ButtonLink';
import SearchModal from '../SearchModal';
import { logoutUser } from '../../actions/sessionActions';

function Navbar({
  collapsibleNavIsExpanded,
  toggleCollapsibleNav,
  setAuthModalPosition,
  logoutUser,
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
        handleClick={() => toggleCollapsibleNav()}
      />
      <NavbarBrand />
      <CollapsibleGroup
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        openSearchModal={openSearchModal}
      />
      <div className="ml-auto flex items-center order-2 md:order-3 relative">
        {isAuthenticated ? (
          <ButtonLink
            additionalClasses="hidden md:block mr-2 sm:mr-3"
            handleClick={logoutUser}
          >
            Logout
          </ButtonLink>
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
        <SearchModalTrigger
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
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
