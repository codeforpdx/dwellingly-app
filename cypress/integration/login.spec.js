describe('Login', function () {
  beforeEach(() => {
    cy.app('clean')
    cy.appScenario('basic')
  })

  it('logs in the user', function () {
    cy.visit('/')

    cy.get('input[name="email"]').type('admin@dwellingly.org')
    cy.get('input[name="password"]').type('asdfasdf')
    cy.get('button').contains('LOG IN').click()

    cy.location('pathname').should('eq', '/dashboard')
  })
})
