import React from 'react';
import { waitForDomChange, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import renderWithRedux from './utils/renderWithRedux';
import Login from '../components/Login';

jest.mock('axios');

const setAuthModalPosition = jest.fn();
const handleClose = jest.fn();

const email = 'fakeEmail@gmail.com';
const password = 'fAkEPAssWoRd';

const setupLoginWithInputs = () => {
  const utils = renderWithRedux(
    <Login
      setAuthModalPosition={setAuthModalPosition}
      tabIndex="0"
      handleClose={handleClose}
    />
  );

  const emailInput = utils.getByLabelText('Email:');
  const passwordInput = utils.getByLabelText('Password:');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const loginSubmitBtn = utils.getByTestId('submitLogin');

  return { ...utils, emailInput, passwordInput, loginSubmitBtn };
};

afterEach(() => {
  axiosMock.post.mockClear();
});

test('displays error messages and behavior from login submission', async () => {
  axiosMock.post.mockRejectedValueOnce({
    response: { data: { message: 'error message' } },
  });

  const {
    getByRole,
    emailInput,
    passwordInput,
    loginSubmitBtn,
  } = setupLoginWithInputs();

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);

  expect(loginSubmitBtn).toBeEnabled();
  fireEvent.click(loginSubmitBtn);

  expect(axiosMock.post).toHaveBeenCalledTimes(1);
  expect(loginSubmitBtn).toHaveTextContent('Pending . . .');
  expect(loginSubmitBtn).toBeDisabled();

  await waitForDomChange(() =>
    expect(getByRole('alert')).toHaveTextContent('error message')
  );

  expect(loginSubmitBtn).toBeEnabled();
});

test('displays success messages and behavior from login submission', async () => {
  axiosMock.post.mockResolvedValueOnce({
    data: {
      token: '13498sdjskfdjh2108uJJJU',
      user: {
        id: '189SDV2N499AJdb',
        name: 'Mystery Man',
        authorSlug: 'mystery-man',
        email: 'fakeEmail@gmail.com',
      },
    },
  });

  const {
    getByRole,
    emailInput,
    passwordInput,
    loginSubmitBtn,
  } = setupLoginWithInputs();

  expect(emailInput).toHaveValue(email);
  expect(passwordInput).toHaveValue(password);

  fireEvent.click(loginSubmitBtn);
  expect(axiosMock.post).toHaveBeenCalledTimes(1);

  await waitForDomChange(() => {
    expect(loginSubmitBtn).toHaveTextContent('Pending . . .');
    expect(loginSubmitBtn).toBeDisabled();
  });

  expect(getByRole('alert')).toHaveTextContent('Success!');
  wait(() => expect(handleClose).toHaveBeenCalledTimes(1));
});
