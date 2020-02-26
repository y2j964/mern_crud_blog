import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import uuid from 'uuid';
import renderWithRedux from './utils/renderWithRedux';
import Author from '../pages/Author';

test('loads and displays posts by same author', async () => {
  const initialState = {
    posts: {
      items: [
        {
          title: 'Selected Post 1',
          description: 'This is testing the posts by author getter',
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
          body: 'Nothing to see here.',
          author: 'George Harrison',
          date: '2020-01-06T06:29:24.245+00:00',
          _id: uuid.v4(),
          authorSlug: 'george-harrison',
          postSlug: 'ignored-post',
        },
      ],
    },
  };
  const history = createMemoryHistory();
  const authorMatch = {
    params: {
      authorSlug: 'justin-mooney',
    },
  };
  const { getByText, queryByText } = renderWithRedux(
    <Router history={history}>
      <Author match={authorMatch} />
    </Router>,
    { initialState }
  );

  const cardPost1 = getByText(/selected post 1/i);
  const cardPost2 = getByText(/selected post 2/i);

  expect(cardPost1).toBeInTheDocument();
  expect(cardPost2).toBeInTheDocument();
  expect(queryByText('Ignored Post')).not.toBeInTheDocument();
});
