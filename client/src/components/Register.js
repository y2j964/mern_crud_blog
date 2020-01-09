import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputText, InputEmail, InputPassword } from './Input';
import { registerUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

// eslint-disable-next-line no-shadow
function Register({ registerUser, clearErrors }) {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // clear errors on unmount so that they don't persist if user reopens modal
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    registerUser(user);
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Register
        </h2>
      </header>
      <form action="" onSubmit={onSubmit}>
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
        >
          Register
        </button>
      </form>
    </React.Fragment>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(null, { registerUser, clearErrors })(Register);
