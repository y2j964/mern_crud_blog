import React from 'react';
import { waitForDomChange, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRedux from './utils/renderWithRedux';
import AddPostAuthenticated from '../components/AddPostAuthenticated';

jest.mock('axios');

const initialState = {
  session: {
    token: 'e98gyphi4jntgwskjn3498hdjnkjn',
    isAuthenticated: true,
    user: {
      id: '13refjkn2uiwnfjn123567j',
      name: 'Justin Mooney',
      authorSlug: 'justin-mooney',
      email: 'fakeEmail@gmail.com',
    },
  },
  communication: {
    posts: {
      success: null,
    },
  },
};

const addedPost = {
  title: 'Added Post',
  description: 'This is post has just been added',
  body: 'Nothing to see here.',
  author: 'Justin Mooney',
  date: '2020-01-06T06:29:24.245+00:00',
  _id: '123asd345yui',
  authorSlug: 'justin-mooney',
  postSlug: 'selected-post',
};

const setupPostForm = () => {
  const history = createMemoryHistory({
    initialEntries: ['/add-post'],
  });

  const utils = renderWithRedux(
    <Router history={history}>
      <AddPostAuthenticated />
    </Router>,
    { initialState }
  );

  const title = utils.getByLabelText('Title:');
  const description = utils.getByLabelText('Description:');
  const body = utils.getByLabelText('Body:');
  const submitBtn = utils.getByText(/submit/i);

  return { ...utils, title, description, body, submitBtn };
};

afterEach(() => {
  axiosMock.post.mockClear();
});

test('displays success messages and behavior from post patch submission', async () => {
  axiosMock.post.mockResolvedValueOnce({
    data: addedPost,
  });

  const { getByText, title, description, body, submitBtn } = setupPostForm();

  expect(title).toBeEmpty();
  expect(description).toBeEmpty();
  expect(body).toBeEmpty();

  fireEvent.change(title, { target: { value: addedPost.title } });
  expect(title).toHaveValue(addedPost.title);

  fireEvent.change(description, { target: { value: addedPost.description } });
  expect(description).toHaveValue(addedPost.description);

  fireEvent.change(body, { target: { value: addedPost.body } });
  expect(body).toHaveValue(addedPost.body);

  fireEvent.click(submitBtn);
  expect(axiosMock.post).toHaveBeenCalledTimes(1);

  await waitForDomChange(() => {
    expect(submitBtn).toHaveTextContent('Pending . . .');
    expect(submitBtn).toBeDisabled();
  });

  expect(getByText(/navigating back to posts/i)).toBeInTheDocument();
});

test('displays error messages and behavior from post patch submission', async () => {
  axiosMock.post.mockRejectedValueOnce({
    response: { data: { message: 'error message' } },
  });

  const { getByRole, title, description, body, submitBtn } = setupPostForm();

  expect(title).toBeEmpty();
  expect(description).toBeEmpty();
  expect(body).toBeEmpty();

  fireEvent.change(title, { target: { value: addedPost.title } });
  expect(title).toHaveValue(addedPost.title);

  fireEvent.change(description, { target: { value: addedPost.description } });
  expect(description).toHaveValue(addedPost.description);

  fireEvent.change(body, { target: { value: addedPost.body } });
  expect(body).toHaveValue(addedPost.body);

  fireEvent.click(submitBtn);
  expect(axiosMock.post).toHaveBeenCalledTimes(1);

  await waitForDomChange(() => {
    expect(submitBtn).toHaveTextContent('Pending . . .');
    expect(submitBtn).toBeDisabled();
  });

  expect(getByRole('alert')).toHaveTextContent('error message');
  expect(submitBtn).toBeEnabled();
});
