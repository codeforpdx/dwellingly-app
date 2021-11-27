describe('Staff Assignments', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.setup()
    cy.login(email, password)
    cy.createStaffUser()
    cy.createTenant()
  })

  it('assigns staff to a unhoused tenant', function () {
    cy.visit('/dashboard')
    cy.contains('Tenant Test Tenant')
    cy.get('select').select('Staff Test User')
    cy.contains('SAVE ASSIGNMENTS').click()
    cy.contains('Tenant Test Tenant').should('not.exist')
    cy.visit('/manage/tenants')
    cy.wait(1000)
    cy.get('label[for="switchhousedToggleSwitch"]').click()
    cy.contains('Tenant Test Tenant')
    cy.contains('Staff Test User')
  })
})
