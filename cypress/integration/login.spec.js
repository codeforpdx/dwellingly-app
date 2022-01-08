describe('Login', () => {
  beforeEach(() => {
    cy.app('clean')
    cy.appScenario('basic')
    cy.visit('/')
  })

  it('logs in the user', () => {
    cy.submitLoginForm('admin@dwellingly.org')
    cy.location('pathname').should('eq', '/dashboard')
  })

  describe('invalid login credentials', () => {
    it('does not authenticate', () => {
      cy.submitLoginForm('admin@dwellingly.org', 'invalid_password')
      cy.wait(500)
      cy.location('pathname').should('eq', '/login')
      cy.get('.Toastify__toast-body').should('include.text', 'Invalid email or password')
    })
  })

  describe('arhived users', () => {
    beforeEach(() => {
      cy.appFactories([
        ['create', 'admin', {archived: true, email: 'archivedAdmin@dw.org'} ]
      ])
    })

    it('does not authenticate', () => {
      cy.submitLoginForm('archivedAdmin@dw.org')
      cy.wait(500)
      cy.location('pathname').should('eq', '/login')
      cy.get('.Toastify__toast-body').should('include.text', 'account has been deactivated')
    })
  })

  describe('un-approved users', () => {
    beforeEach(() => {
      cy.appFactories([
        ['create', 'unauthorized_user', {email: 'unauthorized@dw.org'} ]
      ])
    })

    it('does not authenticate', () => {
      cy.submitLoginForm('unauthorized@dw.org')
      cy.wait(500)
      cy.location('pathname').should('eq', '/login')
      cy.get('.Toastify__toast-body').should('include.text', 'account is not activated yet')
    })
  })
})
