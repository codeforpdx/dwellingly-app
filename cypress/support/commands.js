// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method:'POST',
    url:'api/login',
    body: {
      email,
      password,
    }
  })
    .its('body')
    .then((body) => {
      window.localStorage.setItem('dwellinglyAccess', body.access_token);
      window.localStorage.setItem('dwellinglyRefresh', body.refresh_token);
    })
})

Cypress.Commands.add('deleteUser', (id) => {
  cy.request({
    method: 'DELETE',
    url: `api/user/${id}`,
    headers: { 'Authorization' : `Bearer ${localStorage.dwellinglyAccess}` },
  })
})
