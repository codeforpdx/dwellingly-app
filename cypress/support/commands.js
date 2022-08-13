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

Cypress.Commands.add('login', (email) => {
  cy.request({
    method:'GET',
    url:'/api/cypress_sign_in',
    body: {
      email,
    }
  })
    .its('body')
    .then((body) => {
      // TODO: Long term, I'd like to remove this
      window.localStorage.setItem('authenticated', true)
      window.localStorage.setItem('firstName', 'Admin Fix this')
      window.localStorage.setItem('lastName', 'Fix this')
      window.localStorage.setItem('phone', '5555555555')
      window.localStorage.setItem('email', email)
      window.localStorage.setItem('admin', true)
      window.localStorage.setItem('staff_level', true)
      window.localStorage.setItem('staff', false)
      window.localStorage.setItem('property_manager', false)
    })
})

Cypress.Commands.add('createPendingUser', () => {
  cy.request({
    method: 'POST',
    url: 'api/tests/cypress?create_pending_user=true',
    body: {
      email: "pendingTestUser@example.com",
      firstName: "Pending Test User",
      lastName: "Pending Test User",
      password: "12345678",
      confirmPassword: "12345678",
      phone: "503-555-5555"
    },
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

Cypress.Commands.add('createPropertyManager', () => {
  cy.request({
    method: 'POST',
    url: 'api/tests/cypress?create_property_manager=true',
    body: {
      email: "manager@the_tenants.com",
      firstName: "Property Manager",
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


// Form commands

Cypress.Commands.add('submitLoginForm', (email, password='asdfasdf') => {
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button').contains('LOG IN').click()
})

Cypress.Commands.add('fillInPropertyForm', () => {
  cy.get('input[name="name"]').type('The Tenants')
  cy.get('input[name="address"]').type('11 S Main St.')
  cy.get('input[name="city"]').type('Beaverton')
  cy.get('input[name="state"]').type('OR')
  cy.get('input[name="zipcode"]').type('97225')
  cy.get('input[name="num_units"]').type('23')
})

Cypress.Commands.add('fillInTenantForm', () => {
  cy.get('input[name="firstName"]').type('Billy')
  cy.get('input[name="lastName"]').type('Bob')
  cy.get('input[name="phone"]').type('555-555-5555')
})

Cypress.Commands.add('fillInPropertyManagerForm', () => {
  cy.get('input[name="firstName"]').type('Franky')
  cy.get('input[name="lastName"]').type('Property Manager')
  cy.get('input[name="phone"]').type('555-555-5555')
  cy.get('input[name="email"]').type('pm@thepowells.lake')
})
