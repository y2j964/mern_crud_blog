import React from 'react';
import {
  render,
  fireEvent,
  within,
  waitForDomChange,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('launch login modal, toggle modal views, and close login modal in desktop view', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    // eslint-disable-next-line no-unused-vars
    getByLabelText,
    getByTestId,
  } = render(
    <React.Fragment>
      <Router history={history}>
        <App />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const logInBtn = getByTestId('desktopLoginModalBtn');
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

  await waitForDomChange(() =>
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  );
});

test('launch register modal and close register modal in desktop view', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    getByLabelText,
    getByTestId,
  } = render(
    <React.Fragment>
      <Router history={history}>
        <App />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const registerBtn = getByTestId('desktopRegisterModalBtn');
  fireEvent.click(registerBtn);

  expect(getByRole('dialog')).toBeInTheDocument();

  const loginModal = getByTestId('loginModal');
  const registerModal = getByTestId('registerModal');

  expect(registerModal).toHaveAttribute('aria-hidden', 'false');
  expect(loginModal).toHaveAttribute('aria-hidden', 'true');

  const closeBtn = within(registerModal).getByLabelText('close modal');
  fireEvent.click(closeBtn);

  await waitForDomChange(() =>
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  );
});

test('launch login modal and close login modal in mobile view', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    getByLabelText,
    getByTestId,
  } = render(
    <React.Fragment>
      <Router history={history}>
        <App />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const loginBtn = getByTestId('mobileLoginModalBtn');
  fireEvent.click(loginBtn);

  expect(getByRole('dialog')).toBeInTheDocument();

  const loginModal = getByTestId('loginModal');
  const registerModal = getByTestId('registerModal');

  expect(loginModal).toHaveAttribute('aria-hidden', 'false');
  expect(registerModal).toHaveAttribute('aria-hidden', 'true');

  const closeBtn = within(registerModal).getByLabelText('close modal');
  fireEvent.click(closeBtn);

  await waitForDomChange(() =>
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  );
});

test('launch register modal and close register modal in mobile view', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByRole,
    queryByRole,
    getByLabelText,
    getByTestId,
  } = render(
    <React.Fragment>
      <Router history={history}>
        <App />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>
  );

  expect(queryByRole('dialog')).not.toBeInTheDocument();

  const registerBtn = getByTestId('mobileRegisterModalBtn');
  fireEvent.click(registerBtn);
  expect(getByRole('dialog')).toBeInTheDocument();

  const loginModal = getByTestId('loginModal');
  const registerModal = getByTestId('registerModal');

  expect(registerModal).toHaveAttribute('aria-hidden', 'false');
  expect(loginModal).toHaveAttribute('aria-hidden', 'true');

  const closeBtn = within(registerModal).getByLabelText('close modal');
  fireEvent.click(closeBtn);

  await waitForDomChange(() =>
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  );
});
