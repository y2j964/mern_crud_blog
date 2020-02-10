import { getFilteredPosts } from '../components/SearchModal';

const initialState = {
  posts: {
    isInitiallyFetched: false,
    items: [
      {
        title: 'Post 1',
        description: "Some line from Bob Dylan's 'Mr. Tambourine Man'",
        body: "Evening's empire has returned into sand",
        author: 'Bob Dylan',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'bob-dylan',
        postSlug: 'post-1',
      },
      {
        title: 'Post 2',
        description: "Some line from Bob Dylan's 'Ballad of a Thin Man'",
        body:
          'You have many contacts among the lumberjacks to get you facts when someone attacks your imagination',
        author: 'Bob Dylan',
        date: '2020-01-07T06:29:24.245+00:00',
        _id: 'sdf89yphtjrwfk4toijJ',
        authorSlug: 'bob-dylan',
        postSlug: 'post-2',
      },
      {
        title: 'Post 3',
        description: "Don't bother me",
        body: 'Nothing to see here.',
        author: 'George Harrison',
        date: '2020-01-06T06:29:24.245+00:00',
        _id: '123asd345yui',
        authorSlug: 'george-harrison',
        postSlug: 'post-3',
      },
    ],
  },
};

test('Returns entries for match of beginning of word', () => {
  const updatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'balla'
  );
  // balla from ballad
  expect(updatedFilteredPosts).toHaveLength(1);
  expect(updatedFilteredPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining(initialState.posts.items[1]),
    ])
  );
});

test('Returns nothing if only match end of word', () => {
  const updatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'allad'
  );
  // allad from ballad
  expect(updatedFilteredPosts).toHaveLength(0);
});

test('Returns nothing if only match middle of word', () => {
  const updatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'lla'
  );
  // lla from ballad
  expect(updatedFilteredPosts).toHaveLength(0);
});

test('Returns matches on author, description, and title', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'post 1'
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(1);
  expect(firstUpdatedFilteredPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining(initialState.posts.items[0]),
    ])
  );

  const secondUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'tambourine'
  );
  expect(secondUpdatedFilteredPosts).toHaveLength(1);
  expect(secondUpdatedFilteredPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining(initialState.posts.items[0]),
    ])
  );

  const thirdUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'harrison'
  );
  expect(thirdUpdatedFilteredPosts).toHaveLength(1);
  expect(thirdUpdatedFilteredPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining(initialState.posts.items[2]),
    ])
  );
});

test('Returns nothing when matches body', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    initialState.posts.items[0].body
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(0);
});

test('Returns nothing when matches post-slug', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    initialState.posts.items[0].postSlug
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(0);
});

test('Returns nothing when matches author-slug', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    initialState.posts.items[0].authorSlug
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(0);
});

test('Returns nothing when matches id', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    initialState.posts.items[0].id
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(0);
});

test('Returns multiple posts when applicable', () => {
  const firstUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'post'
  );
  expect(firstUpdatedFilteredPosts).toHaveLength(3);
  expect(firstUpdatedFilteredPosts).toEqual(
    expect.arrayContaining(initialState.posts.items)
  );

  const secondUpdatedFilteredPosts = getFilteredPosts(
    initialState.posts.items,
    'dylan'
  );
  expect(secondUpdatedFilteredPosts).toHaveLength(2);
  expect(secondUpdatedFilteredPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining(initialState.posts.items[0]),
      expect.objectContaining(initialState.posts.items[1]),
    ])
  );
});
