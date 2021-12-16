describe('Add Tenant', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.appFactories([
      ['create', 'staff', {email: 'staff@dwellingly.org', firstName: 'Franky', lastName: 'Bob'} ]
    ])
    cy.login(admin)
  })

  it('creates a tenant', function () {
    cy.visit('/add/tenant')
    cy.fillInTenantForm()
    cy.get('button').contains('SAVE').click()

    cy.visit('/manage/tenants')
    cy.wait(1000)
    cy.get('label[for="switchhousedToggleSwitch"]').click()
    cy.contains('Billy Bob').should('exist')
  })

  it('creates a tenant with a lease', function () {
    cy.visit('/add/tenant')
    cy.fillInTenantForm()
    cy.contains('Create New Property').click()
    cy.fillInPropertyForm()
    cy.get('form.add-property__form-container').contains('SAVE').click()
    cy.get('form.add-property__form-container').should('not.exist')
    cy.contains('The Tenants').should('exist')

    cy.get('input[name="unitNum"]').type('d23')
    cy.get('input[name="occupants"]').type('3')
    cy.get('div.calendarModal svg path').click({ force: true })
    cy.get(':nth-child(2) > .react-calendar').within(($calendar) => {
      cy.get('.react-calendar__navigation > .react-calendar__navigation__next-button').click()
      cy.wait(500)
      cy.get('.react-calendar__month-view__days > button').contains('22').click()
    })
    cy.get('button').contains('Confirm').click()
    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/tenants')
    cy.wait(500)
    cy.contains('Billy Bob').should('exist')
  })

  it('creates a tenant with staff assigned', function () {
    cy.visit('/add/tenant')
    cy.get('input[title="Search JOIN Staff"]').first().type('F')
    cy.get('.styles-module_resultItemLabel__rcaln:contains(Franky Bob)').click()

    cy.fillInTenantForm()

    cy.get('button').contains('SAVE').click()
    cy.wait(500)

    cy.visit('/manage/tenants')
    cy.wait(1000)
    cy.get('label[for="switchhousedToggleSwitch"]').click()
    cy.contains('Billy Bob').should('exist')
    cy.contains('Franky Bob').should('exist')
  })
})
