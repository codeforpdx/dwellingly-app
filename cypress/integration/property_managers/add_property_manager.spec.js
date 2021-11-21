describe('Add Property Manager', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.login(admin)
  })

  it('creates a property manager', function () {
    cy.visit('manage/managers')
    cy.contains('+ ADD NEW').click()
    cy.fillInPropertyManagerForm()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('manage/managers')
    cy.wait(500)
    cy.contains('pm@thepowells.lake').should('exist')
    cy.contains('Franky Property Manager').click()
    cy.location('pathname').should('match', /^\/manage\/managers\/\d+$/)
  })

  it('creates a property manager with an assigned proeprty', function () {
    cy.visit('add/manager')
    cy.wait(500)

    cy.contains('Create New Property').click()
    cy.fillInPropertyForm()
    cy.get('form.add-property__form-container').contains('SAVE').click()
    cy.get('form.add-property__form-container').should('not.exist')
    cy.contains('The Tenants').should('exist')

    cy.fillInPropertyManagerForm()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/properties')
    cy.wait(500)
    cy.contains('The Tenants').should('exist')
    cy.contains('Franky Property Manager').should('exist')
  })
})
