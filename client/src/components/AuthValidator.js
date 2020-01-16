import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Register from './Register';
import Login from './Login';
import Dialog from './Modal/Dialog';
import useWindowWidth from '../utilityFunctions/useWindowWidth';

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

const AuthValidator = ({
  authModalPosition,
  setAuthModalPosition,
  handleClose,
}) => {
  const windowWidth = useWindowWidth();
  // default heights that will appear at most screen widths
  const [loginHeight, setLoginHeight] = useState('399px');
  const [registerHeight, setRegisterHeight] = useState('477px');

  // update height values on debounced browser resize
  useEffect(() => {
    // won't get accurate measurement unless we do the setTimeout
    setTimeout(() => {
      const updatedRegisterHeight = document.querySelector('.flip-card__back')
        .offsetHeight;
      const updatedLoginHeight = document.querySelector('.flip-card__front')
        .offsetHeight;

      setLoginHeight(`${updatedLoginHeight}px`);
      setRegisterHeight(`${updatedRegisterHeight}px`);
    }, 0);
  }, [windowWidth]);

  const {
    isFlipped,
    loginAriaHidden,
    loginTabIndex,
    registerAriaHidden,
    registerTabIndex,
  } = authModalView(loginHeight, registerHeight)[
    `${authModalPosition}IsActive`
  ];

  return (
    <div className="flip-card" style={{ height: loginHeight }}>
      <div className="flip-card__inner" style={isFlipped}>
        <Dialog
          handleClose={handleClose}
          additionalClasses="flip-card__front"
          tabIndex={loginTabIndex}
          ariaHidden={loginAriaHidden}
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
        >
          <Register
            setAuthModalPosition={setAuthModalPosition}
            tabIndex={registerTabIndex}
            handleClose={handleClose}
          />
        </Dialog>
      </div>
    </div>
  );
};

AuthValidator.propTypes = {
  authModalPosition: PropTypes.oneOf(['login', 'register']).isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AuthValidator;
