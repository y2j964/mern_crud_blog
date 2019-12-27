import React, { useState } from 'react';

export default function Login() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <React.Fragment>
      <header className="flex items-center mb-6">
        <h2 className="text-3xl text-center w-full font-bold">Register</h2>
      </header>
      <form action="" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="loginName">
            Name:
          </label>
          <input
            type="text"
            autoComplete="name"
            aria-required={true}
            required={true}
            name="loginName"
            id="loginName"
            className="form-input"
            onChange={e => setNameValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="loginEmail">
            Email:
          </label>
          <input
            type="email"
            autoComplete="email"
            aria-required={true}
            required={true}
            name="loginEmail"
            id="loginEmail"
            className="form-input"
            onChange={e => setEmailValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block" htmlFor="loginPassword">
            Password:
          </label>
          <input
            type="password"
            autoComplete="current-password"
            aria-required={true}
            required={true}
            minLength={8}
            name="loginPassword"
            id="loginPassword"
            className="form-input"
            aria-describedby="passwordDetails"
            onChange={e => setPasswordValue(e.target.value)}
          />
          <small
            className="text-sm text-gray-500 leading-none"
            id="passwordDetails"
          >
            Passwords must be at least 8 characters long.
          </small>
        </div>
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
