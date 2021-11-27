describe('Grant Access', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.appFactories([
      ['create', 'unauthorized_user', {email: 'user@dwellingly.org', firstName: 'Pending', lastName: 'Test User'} ]
    ])
    cy.login(admin)
  })

  it('Approves user', function () {
    cy.visit('/dashboard')
    cy.contains('ADD').click()
    cy.location('pathname').should('match', /^\/request-access\/\d+$/)
    cy.location('pathname').invoke('split', '/').its(2).as('pendingUserID')
    cy.get('select').select('PROPERTY_MANAGER')
    cy.contains('GRANT ACCESS').click()
    cy.get('.Toastify__toast-body').should('include.text', 'User access granted')
  })

  it('Denies user access', function () {
    cy.visit('/dashboard')
    cy.contains('Pending Test User')
    cy.contains('DECLINE').click()
    cy.contains('Yes').click()
    cy.contains('Pending Test User').should('not.exist')
  })
})
