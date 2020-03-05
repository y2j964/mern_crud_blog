import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputEmail, InputPassword } from './Input';
import { loginUser } from '../actions/sessionActions';
import { LOGIN_USER } from '../actions/types';
import { clearSessionStatuses } from '../actions/communicationActions';
import WithErrorNotification from './WithErrorNotification';
import WithSuccessNotification from './WithSuccessNotification';
import { AccentButton } from './Button/Button';

function Login({
  setAuthModalPosition,
  handleClose,
  tabIndex,
  // eslint-disable-next-line no-shadow
  loginUser,
  // eslint-disable-next-line no-shadow
  clearSessionStatuses,
  errorMessage,
  sessionSuccess,
}) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleViewRef = useRef();
  // clear errors so that errors don't persist
  // if you don't also run this on unmount, it won't launch in the event
  // that you logout and attempt to log back in. It will require two
  // clicks to open up the modal again.
  useEffect(() => {
    clearSessionStatuses();
    return () => clearSessionStatuses();
  }, [clearSessionStatuses]);

  // if succeeds, close it
  useEffect(() => {
    if (sessionSuccess !== LOGIN_USER) {
      return;
    }
    const timeoutID = setTimeout(() => handleClose(), 1200);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutID);
  }, [sessionSuccess, handleClose]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      email: emailValue,
      password: passwordValue,
    };

    loginUser(user);
  };

  // if fails, reset button to default state
  useEffect(() => {
    setIsSubmitting(false);
  }, [errorMessage]);

  const toggleView = () => {
    toggleViewRef.current.blur();
    // need to blur so focus can move to active auth view
    setTimeout(() => {
      if (errorMessage) {
        clearSessionStatuses();
      }
    }, 300);
    // 300ms is length of transition; only hide error message when it isn't
    // visible, so transition is smooth and error doesn't show on opposite side
    setAuthModalPosition('register');
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Log In
        </h2>
      </header>
      <form action="" onSubmit={handleSubmit}>
        <WithSuccessNotification success={sessionSuccess === LOGIN_USER} />
        <WithErrorNotification error={errorMessage} />
        <InputEmail
          labelText={'Email: '}
          name="loginEmail"
          tabIndex={tabIndex}
          value={emailValue}
          handleChange={e => setEmailValue(e.target.value)}
          // handleBlur={handleBlur}
        />
        <InputPassword
          labelText={'Password: '}
          name="loginPassword"
          describedBy="loginPasswordDetails"
          tabIndex={tabIndex}
          value={passwordValue}
          handleChange={e => setPasswordValue(e.target.value)}
          // handleBlur={handleBlur}
        >
          <small
            className="block text-sm text-gray-500 leading-none mt-1"
            id="passwordDetails"
          >
            Passwords must be at least 8 characters long.
          </small>
        </InputPassword>
        <AccentButton
          type="submit"
          additionalClasses="w-full mt-2"
          tabIndex={tabIndex}
          disabled={isSubmitting || sessionSuccess === LOGIN_USER}
          dataTestId="submitLogin"
        >
          {!isSubmitting || sessionSuccess === LOGIN_USER
            ? 'Log In'
            : 'Pending . . .'}
        </AccentButton>
      </form>
      <button
        className="text-blue-400 mt-3"
        ref={toggleViewRef}
        onClick={toggleView}
        tabIndex={tabIndex}
      >
        Don&apos;t have an account? Register here.
      </button>
    </React.Fragment>
  );
}

Login.propTypes = {
  handleClose: PropTypes.func.isRequired,
  tabIndex: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
  clearSessionStatuses: PropTypes.func.isRequired,
  setAuthModalPosition: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  sessionSuccess: PropTypes.string,
};

const mapStateToProps = state => ({
  errorMessage: state.communication.session.errorMessage,
  sessionSuccess: state.communication.session.success,
});

export default connect(mapStateToProps, { loginUser, clearSessionStatuses })(
  Login
);
