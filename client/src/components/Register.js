/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputText, InputEmail, InputPassword } from './Input';
import { registerUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

function Register({
  handleClose,
  registerUser,
  clearErrors,
  isAuthenticated,
  errorMsg,
}) {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // clear errors so that errors don't persist
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated, handleClose]);

  const onSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    registerUser(user);
    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Register
        </h2>
      </header>
      <form action="" onSubmit={onSubmit}>
        {errorMsg && (
          <div
            className="bg-red-200 mb-3 p-3 rounded-sm flex items-center"
            role="alert"
          >
            <p className="text-sm text-red-800 font-bold">{errorMsg}</p>
          </div>
        )}
        <InputText
          labelText={'Name: '}
          name="accountName"
          autoComplete="name"
          isRequired={true}
          value={nameValue}
          handleChange={e => setNameValue(e.target.value)}
        />
        <InputEmail
          labelText={'Email: '}
          name="accountEmail"
          value={emailValue}
          handleChange={e => setEmailValue(e.target.value)}
        />
        <InputPassword
          labelText={'Password: '}
          name="accountPassword"
          describedBy="passwordDetails"
          value={passwordValue}
          handleChange={e => setPasswordValue(e.target.value)}
        >
          <small
            className="text-sm text-gray-500 leading-none"
            id="passwordDetails"
          >
            Passwords must be at least 8 characters long.
          </small>
        </InputPassword>
        <button
          type="submit"
          className="accent-btn accent-btn--is-glowing w-full mt-2"
          disable={`${isSubmitting}`}
        >
          Register
        </button>
      </form>
    </React.Fragment>
  );
}

Register.propTypes = {
  handleClose: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errorMsg: state.error.msg,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
