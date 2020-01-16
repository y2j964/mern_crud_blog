import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Register from './Register';
import Login from './Login';
import Dialog from './Modal/Dialog';

// object lookups here to prevent running same conditional multiple times
const authModalView = {
  loginIsActive: {
    isFlipped: '',
    loginAriaHidden: 'false',
    loginTabIndex: '0',
    registerAriaHidden: 'true',
    registerTabIndex: '-1',
  },
  registerIsActive: {
    isFlipped: 'flip-card__inner--is-flipped',
    loginAriaHidden: 'true',
    loginTabIndex: '-1',
    registerAriaHidden: 'false',
    registerTabIndex: '0',
  },
};

const AuthValidator = ({
  authModalPosition,
  setAuthModalPosition,
  handleClose,
}) => {
  const registerRef = useRef();
  useEffect(() => {
    console.log(document.querySelector('.flip-card__back').clientHeight);
  }, []);

  const {
    isFlipped,
    loginAriaHidden,
    loginTabIndex,
    registerAriaHidden,
    registerTabIndex,
  } = authModalView[`${authModalPosition}IsActive`];

  return (
    <div className="flip-card">
      <div className={`flip-card__inner ${isFlipped}`}>
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
          ref={registerRef}
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
  authModalPosition: PropTypes.string.isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AuthValidator;

// import React from 'react';
// import PropTypes from 'prop-types';
// import Register from './Register';
// import Login from './Login';
// import Dialog from './Dialog';

// // object lookups here to prevent running same conditional 3 times
// const authModalView = {
//   loginIsActive: {
//     transform: 'translateX(0)',
//     loginAdditionalClasses: '',
//     loginAriaHidden: 'false',
//     loginTabIndex: '0',
//     registerAdditionalClasses: 'invisible',
//     registerAriaHidden: 'true',
//     registerTabIndex: '-1',
//   },
//   registerIsActive: {
//     transform: 'translateX(-50%)',
//     loginAdditionalClasses: 'invisible',
//     loginAriaHidden: 'true',
//     loginTabIndex: '-1',
//     registerAdditionalClasses: '',
//     registerAriaHidden: 'false',
//     registerTabIndex: '0',
//   },
// };

// const AuthValidator = ({
//   authModalPosition,
//   setAuthModalPosition,
//   handleClose,
// }) => {
//   const {
//     transform,
//     loginAdditionalClasses,
//     registerAdditionalClasses,
//   } = authModalView[`${authModalPosition}IsActive`];

//   return (
//       <div className={`flip-card${ isFlipped}`}>
//         <div className='flip-card__inner'>
//         <Dialog
//           handleClose={() => setAuthModalPosition()}
//           additionalClasses='flip-card__front'
//         >
//           <Login setAuthModalPosition={setAuthModalPosition} />
//         </Dialog>
//         <Dialog
//           handleClose={() => setAuthModalPosition()}
//           additionalClasses='flip-card__back'
//         >
//           <Register setAuthModalPosition={setAuthModalPosition} />
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// AuthValidator.propTypes = {};

// export default AuthValidator;
