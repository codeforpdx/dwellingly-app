describe('Staff Assignments', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.appFactories([
      ['create', 'staff', {firstName: 'Staff', lastName: 'Test User'} ],
      ['create', 'tenant', {firstName: 'Tenant', lastName: 'Test Tenant'} ]
    ])
    cy.login(admin)
  })

  it('assigns staff to an unhoused tenant', function () {
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
