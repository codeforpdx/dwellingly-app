describe('Add Ticket', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.appFactories([
      ['create', 'tenant', {firstName: 'Tenant', lastName: 'Test Tenant'} ]
    ])
    cy.login(admin)
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
