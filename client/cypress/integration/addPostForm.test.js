import uuid from 'uuid';

const initialPosts = [
  {
    title: 'Selected Post 1',
    description: "Some line from Bob Dylan's 'Mr. Tambourine Man'",
    body: "Evening's empire has returned into sand",
    author: 'Bob Dylan',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: uuid.v4(),
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
    _id: uuid.v4(),
    authorSlug: 'bob-dylan',
    postSlug: 'selected-post-2',
  },
  {
    title: 'Ignored Post',
    description: 'This will be ignored by the regex',
    body: 'Nothing to see here.',
    author: 'George Harrison',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: uuid.v4(),
    authorSlug: 'george-harrison',
    postSlug: 'ignored-post',
  },
];

const authResponse = {
  id: '13refjkn2uiwnfjn123567j',
  name: 'Justin Mooney',
  authorSlug: 'justin-mooney',
  email: 'fakeEmail@gmail.com',
};

const addedPost = {
  title: 'Added Post',
  description: 'This post has just been added',
  body: 'Nothing to see here.',
  author: 'Justin Mooney',
  date: '2020-01-06T06:29:24.245+00:00',
  _id: uuid.v4(),
  authorSlug: 'justin-mooney',
  postSlug: 'selected-post',
};

describe('add post submission', () => {
  it('displays success messages and behavior', () => {
    cy.server();
    cy.route('GET', '/api/auth', authResponse);
    cy.visit('/add-post');
    cy.findByLabelText('Title:')
      .should('to.be.empty')
      .type(addedPost.title)
      .should('have.value', addedPost.title);
    cy.findByLabelText('Description:')
      .should('to.be.empty')
      .type(addedPost.description)
      .should('have.value', addedPost.description);
    cy.get('.ql-editor')
      .type(addedPost.body)
      .should('contain', addedPost.body);
    cy.route({
      method: 'POST',
      url: '/api/posts',
      response: addedPost,
      delay: 100,
    });
    cy.findByText(/submit/i)
      .click()
      .should('contain', 'Pending . . .')
      .should('be.disabled');
    cy.findByText(/navigating back to posts/i);
    cy.route('GET', '/api/posts', initialPosts);
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('displays error messages and behavior', () => {
    cy.server();
    cy.route('GET', '/api/auth', authResponse);
    cy.visit('/add-post');
    cy.findByLabelText('Title:')
      .should('to.be.empty')
      .type(addedPost.title)
      .should('have.value', addedPost.title);
    cy.findByLabelText('Description:')
      .should('to.be.empty')
      .type(addedPost.description)
      .should('have.value', addedPost.description);
    cy.get('.ql-editor')
      .type(addedPost.body)
      .should('contain', addedPost.body);
    cy.route({
      method: 'POST',
      url: '/api/posts',
      status: 400,
      response: { message: 'error message' },
      delay: 100,
    });
    cy.findByText(/submit/i)
      .click()
      .should('contain', 'Pending . . .')
      .should('be.disabled')
      .then(btn => {
        cy.wrap(btn)
          .should('contain', 'Submit')
          .should('be.enabled');
      });
    cy.findByRole('alert').should('contain', 'error message');
  });
});
