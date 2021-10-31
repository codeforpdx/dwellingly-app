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

Cypress.Commands.add('setup', () => {
  cy.request({
    method: 'POST',
    url: 'api/tests/cypress?setup=true',
    body: {},
  })
})

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

Cypress.Commands.add('createPendingUser', () => {
  cy.request({
    method: 'POST',
    url: 'api/register',
    body: {
      email: "pendingTestUser@example.com",
      firstName: "Pending Test User",
      lastName: "Pending Test User",
      password: "12345678",
      confirmPassword: "12345678",
      phone: "503-555-5555"
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('createStaffUser', () => {
  cy.request({
    method: 'POST',
    url: 'api/tests/cypress?create_staff_user=true',
    body: {
      email: "staffer@example.com",
      firstName: "Staff Test",
      lastName: "User",
      phone: "503-555-5555"
    },
  })
})

Cypress.Commands.add('createTenant', () => {
  cy.request({
    method: 'POST',
    url: 'api/tests/cypress?create_tenant=true',
    body: {
      firstName: "Tenant Test",
      lastName: "Tenant",
      phone: "503-555-5555"
    },
  })
})


Cypress.Commands.add('deletePendingUser', () => {
  cy.get('@pendingUserID').then(id => {
    cy.request({
      method: 'DELETE',
      url: `api/user/${id}`,
      headers: { 'Authorization' : `Bearer ${localStorage.dwellinglyAccess}` },
    })
  })
})
