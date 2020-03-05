import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, wait } from '@testing-library/react';
import axiosMock from 'axios';
import uuid from 'uuid';
import renderWithRedux from './utils/renderWithRedux';
import EditPosts from '../pages/EditPosts';

jest.mock('axios');

const initialState = {
  posts: {
    isInitiallyFetched: true,
    items: [
      {
        title: 'Selected Post 1',
        description: 'This is testing the posts by author getter',
        thumbnailImage:
          'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        body: 'Nothing to see here.',
        author: 'Justin Mooney',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: uuid.v4(),
        authorSlug: 'justin-mooney',
        postSlug: 'selected-post-1',
      },
      {
        title: 'Selected Post 2',
        description: 'This post will be deleted',
        thumbnailImage:
          'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        body: 'Nothing to see here.',
        author: 'Justin Mooney',
        date: '2020-01-07T06:29:24.245+00:00',
        _id: uuid.v4(),
        authorSlug: 'justin-mooney',
        postSlug: 'selected-post-2',
      },
      {
        title: 'Ignored Post',
        description: 'This is testing the posts by author getter',
        thumbnailImage:
          'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        body: 'Nothing to see here.',
        author: 'George Harrison',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: uuid.v4(),
        authorSlug: 'george-harrison',
        postSlug: 'ignored-post',
      },
    ],
  },
  session: {
    isAuthenticated: true,
    user: {
      name: 'Justin Mooney',
      authorSlug: 'justin-mooney',
    },
  },
};

test('loads and displays posts by same author', async () => {
  const openLogin = jest.fn();
  const history = createMemoryHistory();
  const { getByText, queryByText } = renderWithRedux(
    <Router history={history}>
      <EditPosts openLogin={openLogin} />
    </Router>,
    { initialState }
  );

  const cardPost1 = getByText(/selected post 1/i);
  const cardPost2 = getByText(/selected post 2/i);

  expect(cardPost1).toBeInTheDocument();
  expect(cardPost2).toBeInTheDocument();

  expect(queryByText('Ignored Post')).not.toBeInTheDocument();
});

test('deletes post and loads new posts sans deleted post', async () => {
  axiosMock.delete.mockResolvedValueOnce(initialState.posts.items[0]._id);
  const openLogin = jest.fn();

  const history = createMemoryHistory();
  const { getByText, getByTestId, getAllByLabelText } = renderWithRedux(
    <React.Fragment>
      <Router history={history}>
        <EditPosts openLogin={openLogin} />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>,
    { initialState }
  );

  const cardPost1 = getByText(/selected post 1/i);
  const cardPost2 = getByText(/selected post 2/i);

  const [deleteBtn1] = getAllByLabelText('delete post');

  fireEvent.click(deleteBtn1);
  expect(getByText(/confirm delete/i)).toBeInTheDocument();

  const finalizeDelete = getByTestId(/finalize delete/i);
  fireEvent.click(finalizeDelete);

  expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  await wait(() => expect(cardPost1).not.toBeInTheDocument());
  expect(cardPost2).toBeInTheDocument();
});
