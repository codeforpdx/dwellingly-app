describe('Add Tenant', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.setup()
    cy.login(email, password)
  })

  // it('creates a tenant', function () {
  //   cy.visit('/add/tenant')
  //   cy.get('input[name="firstName"]').type('Billy')
  //   cy.get('input[name="lastName"]').type('Bob')
  //   cy.get('input[name="phone"]').type('555-555-5555')
  //   cy.get('button').contains('SAVE').click()

  //   cy.visit('/manage/tenants')
  //   cy.wait(1000)
  //   cy.get('label[for="switchhousedToggleSwitch"]').click()
  //   cy.contains('Billy Bob')
  // })

  it('creates a tenant with a lease', function () {
    cy.visit('/add/tenant')
    cy.get('input[name="firstName"]').type('Billy')
    cy.get('input[name="lastName"]').type('Bob')
    cy.get('input[name="phone"]').type('555-555-5555')

    cy.get('button').contains('Create New Property').click()
    cy.get('div.modal form').within(($form) => {
      cy.get('input[name="name"]').type('The Palace')
      cy.get('input[name="address"]').type('11 S Main St.')
      cy.get('input[name="city"]').type('Beaverton')
      cy.get('input[name="state"]').type('OR')
      cy.get('input[name="zipcode"]').type('97225')
      cy.get('input[name="num_units"]').type('23')

      cy.get('button').contains('SAVE').click()
      cy.get('button').contains('CANCEL').click()
    })


    cy.get('input[name="unitNum"]').type('555-555-5555')
    cy.get('input[name="occupants"]').type('555-555-5555')
    cy.get('div.calendarModal svg path').click({ force: true })
    cy.get(':nth-child(2) > .react-calendar').within(($calendar) => {
      cy.get('.react-calendar__navigation > .react-calendar__navigation__next-button').click()
      cy.wait(500)
      cy.get('.react-calendar__month-view__days > button').contains('22').click()
    })
    cy.get('button').contains('Confirm').click()
    cy.get('button').contains('SAVE').click()

    cy.visit('/manage/tenants')
    cy.wait(1000)
    cy.contains('Billy Bob')
  })
})
