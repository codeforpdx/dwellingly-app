describe('Inviting', function () {
  beforeEach(() => {
    const email = 'user1@dwellingly.org'
    const password = '1234'

    cy.login(email, password)
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
    cy.location('pathname').invoke('split', '/').its(3).as('elmerFuddID')

    cy.get('@elmerFuddID').then(id => {
      cy.deleteUser(id)
    })
  })
})
