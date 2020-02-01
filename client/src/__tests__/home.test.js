import React from 'react';
import { waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderWithRedux from './utils/renderWithRedux';
import Home from '../pages/Home';

jest.mock('axios');

test('loads and displays all posts', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: [
      {
        title: 'Test Post',
        description: 'This is testing the all post getter',
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
      <Home />
    </Router>
  );

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  const loadingSpinner = getByText(/loading/i);
  expect(loadingSpinner).toBeInTheDocument();

  const cardPost = await waitForElement(() => getByText(/test post/i));
  expect(cardPost).toBeInTheDocument();

  expect(loadingSpinner).not.toBeInTheDocument();
});
