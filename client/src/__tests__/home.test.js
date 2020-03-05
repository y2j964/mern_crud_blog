import React from 'react';
import { waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRedux from './utils/renderWithRedux';
import App from '../App';

jest.mock('axios');

test('loads and displays all posts', async () => {
  // getUser
  axiosMock.get.mockRejectedValueOnce({
    response: { data: { message: 'Token is not valid' } },
  });
  // getPosts
  axiosMock.get.mockResolvedValueOnce({
    data: [
      {
        title: 'Test Post',
        description: 'This is testing the all post getter',
        thumbnailImage:
          'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        body: 'Nothing to see here.',
        author: 'Justin Mooney',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'justin-mooney',
        postSlug: 'test-post',
      },
    ],
  });

  const history = createMemoryHistory();
  const { getByText } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(getByText(/blog posts/i)).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledTimes(2);
  const loadingSpinner = getByText(/loading/i);
  expect(loadingSpinner).toBeInTheDocument();

  const cardPost = await waitForElement(() => getByText(/test post/i));
  expect(cardPost).toBeInTheDocument();

  expect(loadingSpinner).not.toBeInTheDocument();
});
