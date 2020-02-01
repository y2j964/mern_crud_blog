import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('launch login modal, toggle modal views, and close login modal', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    getByLabelText,
    getByTestId,
  } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const logInBtn = getByText(/log in/i);
  fireEvent.click(logInBtn);

  expect(getByRole('dialog')).toBeInTheDocument();

  const loginModal = getByTestId('loginModal');
  const registerModal = getByTestId('registerModal');

  expect(loginModal).toHaveAttribute('aria-hidden', 'false');
  expect(registerModal).toHaveAttribute('aria-hidden', 'true');

  const toggleToRegisterBtn = getByText(/register here/i);
  const toggleToLoginBtn = getByText(/log in here/i);

  fireEvent.click(toggleToRegisterBtn);

  expect(registerModal).toHaveAttribute('aria-hidden', 'false');
  expect(loginModal).toHaveAttribute('aria-hidden', 'true');

  fireEvent.click(toggleToLoginBtn);

  expect(loginModal).toHaveAttribute('aria-hidden', 'false');
  expect(registerModal).toHaveAttribute('aria-hidden', 'true');

  const closeBtn = within(loginModal).getByLabelText('close modal');
  fireEvent.click(closeBtn);

  expect(queryByRole('dialog')).not.toBeInTheDocument();
});

test('launch register modal and close register modal', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    getByLabelText,
    getByTestId,
  } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const registerBtn = getByText(/register/i);
  fireEvent.click(registerBtn);

  expect(getByRole('dialog')).toBeInTheDocument();

  const loginModal = getByTestId('loginModal');
  const registerModal = getByTestId('registerModal');

  expect(registerModal).toHaveAttribute('aria-hidden', 'false');
  expect(loginModal).toHaveAttribute('aria-hidden', 'true');

  const closeBtn = within(registerModal).getByLabelText('close modal');
  fireEvent.click(closeBtn);

  expect(queryByRole('dialog')).not.toBeInTheDocument();
});
