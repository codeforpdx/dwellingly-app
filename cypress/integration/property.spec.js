describe('Add Property', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.appFactories([
      ['create', 'property_manager', {email: 'mgr@dwellingly.org', firstName: 'Billy', lastName: 'Bob'} ]
    ])
    cy.login(admin)
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
    cy.get('input[title="Search Property Managers"]').first().type('B')
    cy.get('.styles-module_resultItemLabel__rcaln:contains(Billy Bob)').click()
    cy.fillInPropertyForm()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/properties')
    cy.contains('Billy Bob')
    cy.contains('The Tenants').click()
    cy.location('pathname').should('match', /^\/manage\/properties\/\d+$/)
  })
})
