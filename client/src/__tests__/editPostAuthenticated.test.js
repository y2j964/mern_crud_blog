import React from 'react';
import { waitForDomChange, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRedux from './utils/renderWithRedux';
import EditPostForm from '../components/EditPostForm';

jest.mock('axios');

const initialState = {
  posts: {
    items: [
      {
        title: 'Selected Post',
        description: 'This is a selected post',
        body: 'Nothing to see here.',
        author: 'Justin Mooney',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'justin-mooney',
        postSlug: 'selected-post',
      },
      {
        title: 'Ignored Post',
        description: 'This is testing the posts by author getter',
        body: "Don't bother me.",
        author: 'George Harrison',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'george-harrison',
        postSlug: 'ignored-post',
      },
    ],
  },
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

const setupPostForm = () => {
  const history = createMemoryHistory({
    initialEntries: ['/edit-posts/selected-post'],
  });

  const utils = renderWithRedux(
    <Router history={history}>
      <Route exact path="/edit-posts/:postSlug" component={EditPostForm} />
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
  axiosMock.patch.mockClear();
});

test('displays success messages and behavior from post patch submission', async () => {
  const updatedPost = {
    title: 'Selected Post',
    description: 'This is updated',
    body: 'Nothing to see here.',
    author: 'Justin Mooney',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: '123asd345yui',
    authorSlug: 'justin-mooney',
    postSlug: 'selected-post',
  };

  axiosMock.patch.mockResolvedValueOnce({
    data: updatedPost,
  });

  const { getByText, title, description, body, submitBtn } = setupPostForm();

  expect(title).toHaveValue(initialState.posts.items[0].title);
  expect(description).toHaveValue(initialState.posts.items[0].description);
  expect(body).toHaveValue(initialState.posts.items[0].body);

  fireEvent.change(description, { target: { value: updatedPost.description } });
  expect(description).toHaveValue(updatedPost.description);

  fireEvent.click(submitBtn);
  expect(axiosMock.patch).toHaveBeenCalledTimes(1);

  await waitForDomChange(() => {
    expect(submitBtn).toHaveTextContent('Pending . . .');
    expect(submitBtn).toBeDisabled();
  });

  expect(getByText(/navigating back to posts/i)).toBeInTheDocument();
});

test('displays error messages and behavior from post patch submission', async () => {
  axiosMock.patch.mockRejectedValueOnce({
    response: { data: { message: 'error message' } },
  });

  const { getByRole, title, description, body, submitBtn } = setupPostForm();

  expect(title).toHaveValue(initialState.posts.items[0].title);
  expect(description).toHaveValue(initialState.posts.items[0].description);
  expect(body).toHaveValue(initialState.posts.items[0].body);

  fireEvent.change(description, {
    target: { value: 'This is a failed updated' },
  });
  expect(description).toHaveValue('This is a failed updated');

  fireEvent.click(submitBtn);
  expect(axiosMock.patch).toHaveBeenCalledTimes(1);
  await waitForDomChange(() => {
    expect(submitBtn).toHaveTextContent('Pending . . .');
    expect(submitBtn).toBeDisabled();
  });

  expect(getByRole('alert')).toHaveTextContent('error message');
  expect(submitBtn).toBeEnabled();
});
