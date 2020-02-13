import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Navbar from '../components/Navbar/Navbar';
import renderWithRedux from './utils/renderWithRedux';

const initialState = {
  posts: {
    isInitiallyFetched: false,
    items: [
      {
        title: 'Selected Post 1',
        description: "Some line from Bob Dylan's 'Mr. Tambourine Man'",
        body: "Evening's empire has returned into sand",
        author: 'Bob Dylan',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'bob-dylan',
        postSlug: 'selected-post-1',
      },
      {
        title: 'Selected Post 2',
        description: "Some line from Bob Dylan's 'Ballad of a Thin Man'",
        body:
          'You have many contacts among the lumberjacks to get you facts when someone attacks your imagination',
        author: 'Bob Dylan',
        date: '2020-01-07T06:29:24.245+00:00',
        _id: 'sdf89yphtjrwfk4toijJ',
        authorSlug: 'bob-dylan',
        postSlug: 'selected-post-2',
      },
      {
        title: 'Ignored Post',
        description: 'This will be ignored by the regex',
        body: 'Nothing to see here.',
        author: 'George Harrison',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'george-harrison',
        postSlug: 'ignored-post',
      },
    ],
  },
};

test('launch search modal in mobile view, successfully search for posts, and close modal', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByLabelText,
    queryByText,
    getByTestId,
  } = renderWithRedux(
    <React.Fragment>
      <Router history={history}>
        <Navbar
          collapsibleNavIsExpanded={false}
          toggleCollapsibleNav={jest.fn()}
          setAuthModalPosition={jest.fn()}
        />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>,
    { initialState }
  );

  const searchModalBtn = getByTestId('searchMobile');
  fireEvent.click(searchModalBtn);

  const searchInput = getByLabelText(/Search MERN Crud Blog/i);
  expect(searchInput).toBeInTheDocument();

  expect(queryByText(/post 1/i)).not.toBeInTheDocument();
  expect(queryByText(/post 2/i)).not.toBeInTheDocument();

  expect(getByText(/Start typing to see results/i)).toBeInTheDocument();
  expect(queryByText(/loading/i)).not.toBeInTheDocument();

  const searchQuery = 'selected';
  fireEvent.change(searchInput, { target: { value: searchQuery } });

  expect(searchInput).toHaveValue(searchQuery);
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 13 });

  await waitForDomChange(() => {
    expect(getByText(/loading/i)).toBeInTheDocument();
    expect(queryByText(/Start typing to see results/i)).not.toBeInTheDocument();
  });

  await waitForDomChange(() => {
    expect(getByText(/post 1/i)).toBeInTheDocument();
    expect(getByText(/post 2/i)).toBeInTheDocument();
    expect(queryByText(/ignored post/i)).not.toBeInTheDocument();
    expect(queryByText(/Start typing to see results/i)).not.toBeInTheDocument();
    expect(queryByText(/loading/i)).not.toBeInTheDocument();
  });

  const closeBtn = getByLabelText(/close modal/i);
  fireEvent.click(closeBtn);

  await waitForDomChange(() => expect(searchInput).not.toBeInTheDocument());
});

test('launch search modal in mobile view, unsuccessfully search for posts, and close modal', async () => {
  const history = createMemoryHistory();
  const {
    getByText,
    getByLabelText,
    queryByText,
    getByTestId,
  } = renderWithRedux(
    <React.Fragment>
      <Router history={history}>
        <Navbar
          collapsibleNavIsExpanded={false}
          toggleCollapsibleNav={jest.fn()}
          setAuthModalPosition={jest.fn()}
        />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>,
    { initialState }
  );

  const searchModalBtn = getByTestId('searchMobile');
  fireEvent.click(searchModalBtn);

  const searchInput = getByLabelText(/Search MERN Crud Blog/i);
  expect(searchInput).toBeInTheDocument();

  expect(getByText(/Start typing to see results/i)).toBeInTheDocument();
  expect(queryByText(/loading/i)).not.toBeInTheDocument();

  const searchQuery = 'surely this will fail';
  fireEvent.change(searchInput, { target: { value: searchQuery } });

  expect(searchInput).toHaveValue(searchQuery);
  fireEvent.keyDown(searchInput, { key: 'Enter', code: 13 });

  await waitForDomChange(() => {
    expect(getByText(/loading/i)).toBeInTheDocument();
    expect(queryByText(/Start typing to see results/i)).not.toBeInTheDocument();
  });

  await waitForDomChange(() => {
    expect(queryByText(/post 1/i)).not.toBeInTheDocument();
    expect(queryByText(/post 2/i)).not.toBeInTheDocument();
    expect(queryByText(/ignored post/i)).not.toBeInTheDocument();
    expect(queryByText(/Start typing to see results/i)).not.toBeInTheDocument();
    expect(queryByText(/loading/i)).not.toBeInTheDocument();
    expect(
      getByText(/Can't find anything matching those terms/i)
    ).toBeInTheDocument();
  });

  const closeBtn = getByLabelText(/close modal/i);
  fireEvent.click(closeBtn);

  await waitForDomChange(() => expect(searchInput).not.toBeInTheDocument());
});

test('launch search modal in desktop view, and close modal', () => {
  const history = createMemoryHistory();
  const { getByLabelText, getByTestId } = renderWithRedux(
    <React.Fragment>
      <Router history={history}>
        <Navbar
          collapsibleNavIsExpanded={false}
          toggleCollapsibleNav={jest.fn()}
          setAuthModalPosition={jest.fn()}
        />
      </Router>
      <div id="modal-root"></div>
    </React.Fragment>,
    { initialState }
  );

  const searchModalBtn = getByTestId('searchDesktop');
  fireEvent.click(searchModalBtn);

  const searchInput = getByLabelText(/Search MERN Crud Blog/i);
  expect(searchInput).toBeInTheDocument();

  const searchQuery = 'selected';
  fireEvent.change(searchInput, { target: { value: searchQuery } });

  expect(searchInput).toHaveValue(searchQuery);

  const closeBtn = getByLabelText(/close modal/i);
  fireEvent.click(closeBtn);

  waitForDomChange(() => expect(searchInput).not.toBeInTheDocument());
});
