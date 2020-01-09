import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputEmail, InputPassword } from './Input';
import { loginUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

// eslint-disable-next-line no-shadow
function Login({ loginUser, clearErrors }) {
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
      email: emailValue,
      password: passwordValue,
    };
    loginUser(user);
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold" id="modalHeading">
          Log In
        </h2>
      </header>
      <form action="" onSubmit={onSubmit}>
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
          Log In
        </button>
      </form>
    </React.Fragment>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(null, { loginUser, clearErrors })(Login);
