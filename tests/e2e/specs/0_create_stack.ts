import rankings from '../rankings.ts'

const { _ } = Cypress

describe('Creating a stack', () => {
  it('handles errors', () => {
    cy.request('/cypress/reset')
    cy.visit('/')

    cy.dataCy('nameField').type('Sci-fi shows')
    cy.dataCy('cardsField').type('Expanse is Life')
    cy.dataCy('stackSubmit').click()
    cy.get('[data-cy=fieldGroup][data-cy-name=card_names]').dataCy('fieldErrors')
      .should('contain', 'must have at least two items')
  })

  it('creates a stack', () => {
    cy.dataCy('cardsField').clear().type(_.shuffle(rankings).join('\n'))
    cy.dataCy('stackSubmit').click()
    cy.location('hash').should('match', /^#\/stacks\/\w+$/)
  })
})
