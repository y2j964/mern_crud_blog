/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputEmail, InputPassword } from './Input';
import { loginUser } from '../actions/sessionActions';
import { clearSessionStatuses } from '../actions/communicationActions';

function Login({
  setAuthModalPosition,
  handleClose,
  tabIndex,
  loginUser,
  clearSessionStatuses,
  isAuthenticated,
  errorMessage,
}) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleViewRef = useRef();
  // clear errors so that errors don't persist
  useEffect(() => {
    clearSessionStatuses();
  }, [clearSessionStatuses]);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated, handleClose]);

  const onSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      email: emailValue,
      password: passwordValue,
    };

    loginUser(user);
    setIsSubmitting(false);
  };

  const toggleView = () => {
    toggleViewRef.current.blur();
    // need to blur so focus can move to active auth view
    setAuthModalPosition('register');
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Log In
        </h2>
      </header>
      <form action="" onSubmit={onSubmit}>
        {errorMessage && (
          <div
            className="bg-red-200 mb-3 p-3 rounded-sm flex items-center"
            role="alert"
          >
            <p className="text-sm text-red-800 font-bold">{errorMessage}</p>
          </div>
        )}
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
        <button
          type="submit"
          className="accent-btn accent-btn--is-glowing w-full mt-2"
          tabIndex={tabIndex}
          disable={`${isSubmitting}`}
        >
          Log In
        </button>
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
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  errorMessage: state.communication.session.errorMessage,
});

export default connect(mapStateToProps, { loginUser, clearSessionStatuses })(
  Login
);
