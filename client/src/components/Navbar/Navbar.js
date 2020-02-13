import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import NavbarBrand from './NavbarBrand';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';
import CollapsibleGroup from './CollapsibleGroup';
import SearchFilterTrigger from '../Search/SearchFilterTrigger';
import { AccentButton } from '../Button/Button';
import ButtonLink from '../Button/ButtonLink';
import SearchFilter from '../Search/SearchFilter';
import { logoutUser } from '../../actions/sessionActions';
import { clearStatuses } from '../../actions/communicationActions';

function Navbar({
  history,
  setAuthModalPosition,
  // eslint-disable-next-line no-shadow
  logoutUser,
  // eslint-disable-next-line no-shadow
  clearStatuses,
  isAuthenticated,
  children,
}) {
  const [collapsibleNavIsExpanded, setCollapsibleNavIsExpanded] = useState(
    false
  );
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const openSearchFilter = () => setIsSearchFilterOpen(true);

  // on route change . . .
  useEffect(() => {
    const unlisten = history.listen(() => {
      clearStatuses();
      setCollapsibleNavIsExpanded(false);
      setIsSearchFilterOpen(false);
    });
    return () => {
      unlisten();
    };
  }, [history, clearStatuses]);

  return (
    <nav className="navbar">
      <HamburgerToggle
        controls="navbarCollapsibleGroup"
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        handleClick={() =>
          setCollapsibleNavIsExpanded(!collapsibleNavIsExpanded)
        }
      />
      <NavbarBrand />
      <CollapsibleGroup
        collapsibleNavIsExpanded={collapsibleNavIsExpanded}
        openSearchFilter={openSearchFilter}
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
              Login
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
        <SearchFilterTrigger
          openSearchFilter={openSearchFilter}
          isSearchFilterOpen={isSearchFilterOpen}
        />
        <CSSTransition
          in={isSearchFilterOpen}
          timeout={{ enter: 150, exit: 300 }}
          unmountOnExit
          classNames="fade"
        >
          <SearchFilter
            isOpen={isSearchFilterOpen}
            handleClose={() => setIsSearchFilterOpen(false)}
          />
        </CSSTransition>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearStatuses: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, { logoutUser, clearStatuses })(Navbar)
);
