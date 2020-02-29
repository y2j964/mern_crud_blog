const uuid = require('uuid');

const initialPosts = [
  {
    title: 'Selected Post 1',
    description: 'This is a selected post',
    thumbnailImage:
      'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    // the body will be a JSON object. This is done via Quill, but
    // in the test, we have to mock this out. If you don't do this,
    // there will be a cross-origin error
    body: JSON.stringify({
      ops: [{ insert: "A state of confusion I'm in." }],
    }),
    author: 'Justin Mooney',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: '123asd345yui',
    authorSlug: 'justin-mooney',
    postSlug: 'selected-post-1',
  },
  {
    title: 'Selected Post 2',
    description: 'This is a second selected post',
    thumbnailImage:
      'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    body: JSON.stringify({
      ops: [{ insert: 'Nothing to see here.' }],
    }),
    author: 'Justin Mooney',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: uuid.v4(),
    authorSlug: 'justin-mooney',
    postSlug: 'selected-post-2',
  },
  {
    title: 'Ignored Post',
    description: 'This is testing the posts by author getter',
    thumbnailImage:
      'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
    body: JSON.stringify({
      ops: [{ insert: "Don't bother me." }],
    }),
    author: 'George Harrison',
    date: '2020-01-06T06:29:24.245+00:00',
    _id: uuid.v4(),
    authorSlug: 'george-harrison',
    postSlug: 'ignored-post',
  },
];

const updatedPost = {
  title: 'Selected Post 1',
  description: 'This is updated',
  body: ' This is also updated.',
  postSlug: 'selected-post-1',
};

const updatedPostResponse = {
  title: 'Selected Post 1',
  description: 'This is updated',
  thumbnailImage:
    'https://images.unsplash.com/photo-1582685800784-8421bb0a71b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
  body: JSON.stringify({
    ops: [{ insert: "A state of confusion I'm in. This is also updated." }],
  }),
  author: 'Justin Mooney',
  date: '2020-01-06T06:29:24.245+00:00',
  _id: '123asd345yui',
  authorSlug: 'justin-mooney',
  postSlug: 'selected-post-1',
};

const authResponse = {
  id: '13refjkn2uiwnfjn123567j',
  name: 'Justin Mooney',
  authorSlug: 'justin-mooney',
  email: 'fakeEmail@gmail.com',
};

// const userToken = 'e98gyphi4jntgwskjn3498hdjnkjn';

// set token before page load
// beforeEach(() => {
//   cy.visit('/', {
//     onBeforeLoad(win) {
//       win.localStorage.setItem('token', userToken);
//     },
//   });
// });

describe('edit post submission', () => {
  it('displays success messages and behavior', () => {
    cy.server();
    cy.route('GET', '/api/posts', initialPosts);
    cy.route('GET', '/api/auth', authResponse);
    cy.visit('/');
    cy.visit('/edit-posts');
    cy.contains(initialPosts[0].title)
      .parent()
      .parent()
      .within(() => {
        cy.get(`[aria-label="edit post"]`).click();
      });
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/edit-posts/123asd345yui`
    );
    cy.findByLabelText('Title:').should('have.value', initialPosts[0].title);
    cy.findByLabelText('Description:')
      .should('have.value', initialPosts[0].description)
      .clear()
      .should('be.empty')
      .type(updatedPost.description)
      .should('have.value', updatedPost.description);
    cy.findByLabelText('Thumbnail Image:').should(
      'have.value',
      initialPosts[0].thumbnailImage
    );
    cy.get('.ql-editor')
      .should('contain', "A state of confusion I'm in.")
      .type(updatedPost.body)
      .should('contain', updatedPost.body);
    cy.route({
      method: 'PATCH',
      url: '/api/posts/123asd345yui',
      response: updatedPostResponse,
      delay: 100,
    });
    cy.route('GET', '/api/posts', initialPosts);
    cy.findByText(/submit/i)
      .click()
      .should('contain', 'Pending . . .')
      .should('be.disabled');
    cy.findByText(/navigating back to posts/i);
    cy.url().should('eq', `${Cypress.config().baseUrl}/edit-posts`);
  });

  it('displays error messages and behavior', () => {
    cy.server();
    cy.route('GET', '/api/posts', initialPosts);
    cy.route('GET', '/api/auth', authResponse);
    cy.visit('/');
    cy.visit('/edit-posts');
    cy.contains(initialPosts[0].title)
      .parent()
      .parent()
      .within(() => {
        cy.get(`[aria-label="edit post"]`).click();
      });
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}/edit-posts/123asd345yui`
    );
    cy.findByLabelText('Title:').should('have.value', initialPosts[0].title);
    cy.findByLabelText('Description:')
      .should('have.value', initialPosts[0].description)
      .clear()
      .should('be.empty')
      .type(updatedPost.description)
      .should('have.value', updatedPost.description);
    cy.findByLabelText('Thumbnail Image:').should(
      'have.value',
      initialPosts[0].thumbnailImage
    );
    cy.get('.ql-editor')
      .should('contain', "A state of confusion I'm in.")
      .type(updatedPost.body)
      .should('contain', updatedPost.body);
    cy.route({
      method: 'PATCH',
      url: '/api/posts/123asd345yui',
      status: 400,
      response: { message: 'error message' },
      delay: 100,
    });
    cy.route('GET', '/api/posts', initialPosts);
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
