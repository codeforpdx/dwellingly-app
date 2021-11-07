describe('Add Tenant', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.setup()
    cy.login(email, password)
  })

  it('creates a tenant', function () {
    cy.visit('/add/tenant')
    cy.get('input[name="firstName"]').type('Billy')
    cy.get('input[name="lastName"]').type('Bob')
    cy.get('input[name="phone"]').type('555-555-5555')
    cy.get('button').contains('SAVE').click()

    cy.visit('/manage/tenants')
    cy.wait(1000)
    cy.get('label[for="switchhousedToggleSwitch"]').click()
    cy.contains('Billy Bob')
  })
})
