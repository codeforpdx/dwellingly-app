describe('Grant Access', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.login(email, password)
    cy.createPendingUser()
  })

  it('Approves user', function () {
    cy.visit('/dashboard')
    cy.contains('ADD').click()
    cy.location('pathname').should('match', /^\/request-access\/\d+$/)
    cy.location('pathname').invoke('split', '/').its(2).as('pendingUserID')
    cy.get('select').select('PROPERTY_MANAGER')
    cy.contains('GRANT ACCESS').click()
    cy.get('.Toastify__toast-body').should('include.text', 'User access granted')
    cy.deletePendingUser()
  })

  it('Denies user access', function () {
    cy.visit('/dashboard')
    cy.contains('Pending Test User')
    cy.contains('DECLINE').click()
    cy.contains('Yes').click()
    cy.contains('Pending Test User').should('not.exist')
  })
})
