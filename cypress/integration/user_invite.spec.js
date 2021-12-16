describe('Inviting', function () {
  beforeEach(() => {
    const admin = 'admin@dwellingly.org'

    cy.app('clean')
    cy.appScenario('basic')
    cy.login(admin)
  })

  it('creates a property manager user', function () {
    cy.visit('/manage/managers')
    cy.contains('+ ADD NEW').click()

    cy.get('input[name="firstName"]').type('Elmer')
    cy.get('input[name="lastName"]').type('Fudd')
    cy.get('input[name="phone"]').type('503-555-5555')
    cy.get('input[name="email"]').type('elmerfudd@looney.tunes')
    cy.get('button').contains('SAVE').click()

    cy.visit('/manage/managers')
    cy.contains('Elmer Fudd').click()
    cy.location('pathname').should('match', /^\/manage\/managers\/\d+$/)
  })
})
