import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Register from './Register';
import Login from './Login';
import Dialog from './Modal/Dialog';
import useWindowWidth from '../utils/useWindowWidth';
import usePrevious from '../utils/usePrevious';

const getIsFlippedStyle = (loginHeight, registerHeight) => ({
  transform: `rotateX(180deg) translateY(calc((${loginHeight} - ${registerHeight}) / -2))`,
});

// object lookups here to prevent running same conditional multiple times
const authModalView = (loginHeight, registerHeight) => ({
  loginIsActive: {
    isFlipped: {},
    loginAriaHidden: 'false',
    loginTabIndex: '0',
    registerAriaHidden: 'true',
    registerTabIndex: '-1',
  },
  registerIsActive: {
    isFlipped: getIsFlippedStyle(loginHeight, registerHeight),
    loginAriaHidden: 'true',
    loginTabIndex: '-1',
    registerAriaHidden: 'false',
    registerTabIndex: '0',
  },
});

// heights that will appear at most screen widths
const defaultLoginHeight = '399px';
const defaultRegisterHeight = '477px';

const AuthValidator = ({
  authModalPosition,
  setAuthModalPosition,
  handleClose,
}) => {
  const windowWidth = useWindowWidth();
  const [loginHeight, setLoginHeight] = useState(defaultLoginHeight);
  const [registerHeight, setRegisterHeight] = useState(defaultRegisterHeight);

  // update height values on debounced browser resize
  useEffect(() => {
    // won't get accurate measurement unless we do the setTimeout
    const timeoutID = setTimeout(() => {
      const updatedLogin = document.querySelector('.flip-card__front');
      const updatedLoginHeight = updatedLogin
        ? updatedLogin.offsetHeight
        : defaultLoginHeight;
      // revert default value if querySelector returns null

      const updatedRegister = document.querySelector('.flip-card__back');
      const updatedRegisterHeight = updatedRegister
        ? updatedRegister.offsetHeight
        : defaultRegisterHeight;
      // revert default value if querySelector returns null

      setLoginHeight(`${updatedLoginHeight}px`);
      setRegisterHeight(`${updatedRegisterHeight}px`);
    }, 0);

    return () => clearTimeout(timeoutID);
  }, [windowWidth]);

  const prevAuthModalPosition = usePrevious(authModalPosition);
  // if closed, authModalPosition will be set to undefined, which will mess up
  // this object lookup in the modal unmount animation;
  // so track previous value and use in that instance

  const {
    isFlipped,
    loginAriaHidden,
    loginTabIndex,
    registerAriaHidden,
    registerTabIndex,
  } = authModalView(loginHeight, registerHeight)[
    `${authModalPosition || prevAuthModalPosition}IsActive`
  ];

  return (
    <CSSTransition
      in={!!authModalPosition}
      timeout={300}
      unmountOnExit
      classNames="slide-from-top"
      appear
    >
      <div className="flip-card" style={{ height: loginHeight }}>
        <div className="flip-card__inner" style={isFlipped}>
          <Dialog
            handleClose={handleClose}
            additionalClasses="flip-card__front"
            tabIndex={loginTabIndex}
            ariaHidden={loginAriaHidden}
            dataTestId={'loginModal'}
          >
            <Login
              setAuthModalPosition={setAuthModalPosition}
              tabIndex={loginTabIndex}
              handleClose={handleClose}
            />
          </Dialog>
          <Dialog
            handleClose={handleClose}
            additionalClasses="flip-card__back"
            tabIndex={registerTabIndex}
            ariaHidden={registerAriaHidden}
            dataTestId={'registerModal'}
          >
            <Register
              setAuthModalPosition={setAuthModalPosition}
              tabIndex={registerTabIndex}
              handleClose={handleClose}
            />
          </Dialog>
        </div>
      </div>
    </CSSTransition>
  );
};

AuthValidator.propTypes = {
  authModalPosition: PropTypes.oneOf(['login', 'register', '']),
  setAuthModalPosition: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AuthValidator;
