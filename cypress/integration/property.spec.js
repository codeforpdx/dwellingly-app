describe('Add Property', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.setup()
    cy.createPropertyManager()
    cy.login(email, password)
  })

  it('creates a property', function () {
    cy.visit('/manage/properties')
    cy.contains('+ ADD NEW').click()
    cy.fillInPropertyForm()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/properties')
    cy.contains('The Tenants').click()
    cy.location('pathname').should('match', /^\/manage\/properties\/\d+$/)
  })

  it('creates a property with a manager assigned', function () {
    cy.visit('/add/property')
    cy.wait(500)
    cy.get('input[title="Search Property Managers"]').first().type('P')
    cy.get('.styles-module_resultItemLabel__rcaln:contains(Property Manager User)').click()
    cy.fillInPropertyForm()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/properties')
    cy.contains('Property Manager User')
    cy.contains('The Tenants').click()
    cy.location('pathname').should('match', /^\/manage\/properties\/\d+$/)
  })
})
