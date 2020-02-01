import React from 'react';
import { waitForDomChange, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import renderWithRedux from './utils/renderWithRedux';
import Register from '../components/Register';

jest.mock('axios');

const setAuthModalPosition = jest.fn();
const handleClose = jest.fn();

const name = 'Mystery Man';
const email = 'fakeEmail@gmail.com';
const password = 'fAkEPAssWoRd';

const setupRegisterWithInputs = () => {
  const utils = renderWithRedux(
    <Register
      setAuthModalPosition={setAuthModalPosition}
      tabIndex="0"
      handleClose={handleClose}
    />
  );

  const nameInput = utils.getByLabelText('Name:');
  const emailInput = utils.getByLabelText('Email:');
  const passwordInput = utils.getByLabelText('Password:');

  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const loginSubmitBtn = utils.getByTestId('submitRegister');

  return { ...utils, nameInput, emailInput, passwordInput, loginSubmitBtn };
};

afterEach(() => {
  axiosMock.post.mockClear();
});

test('displays error messages and behavior from register submission', async () => {
  const {
    getByRole,
    nameInput,
    emailInput,
    passwordInput,
    loginSubmitBtn,
  } = setupRegisterWithInputs();

  axiosMock.post.mockRejectedValueOnce({
    response: { data: { message: 'error message' } },
  });

  expect(nameInput).toHaveValue(name);
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

test('displays success messages and behavior from register submission', async () => {
  const {
    getByRole,
    nameInput,
    emailInput,
    passwordInput,
    loginSubmitBtn,
  } = setupRegisterWithInputs();

  axiosMock.post.mockResolvedValueOnce({
    data: {
      token: '13498sdjskfdjh2108uJJJU',
      user: {
        id: '189SDV2N499AJdb',
        name: 'Mystery Man',
        authorSlug: 'mystery-man',
        email: 'fakeEmail@gmail.com',
        password: 'encRyPTedPAsSWoRD',
      },
    },
  });

  expect(nameInput).toHaveValue(name);
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
