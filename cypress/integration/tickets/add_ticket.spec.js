describe('Add Ticket', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.setup()
    cy.login(email, password)
    cy.createTenant()
  })

  it('creates a ticket', function () {
    cy.visit('manage/tickets')
    cy.contains('+ ADD NEW').click()
    cy.get('input[title="Search Tenants"]').first().type('T')
    cy.get('.styles-module_resultItemLabel__rcaln:contains(Tenant Test Tenant)').click()
    cy.get('input[name="issue"]').type('leaky faucet')
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('manage/tickets')
    cy.wait(500)
    cy.contains('Tenant Test Tenant').should('exist')
    cy.contains('leaky faucet').should('exist')
  })
})
