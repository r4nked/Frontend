import rankings from '../fixtures/rankings'
import { shuffle } from 'lodash-es'

describe('Creating a stack', () => {
  it('handles errors', () => {
    cy.visit('/')

    cy.findByLabelText('Stack name').type('Sci-fi shows')
    cy.findByLabelText('Stack items').type('Expanse is Life')
    cy.findByRole('button', { name: 'Let’s Rank' }).click()
    cy.findByTestId('fieldGroup-card_names').within(() => {
      cy.findByTestId('fieldErrors').should('contain', 'must have at least two items')
    })
  })

  it('creates a stack', () => {
    cy.visit('/')

    cy.findByLabelText('Stack name').type('Sci-fi shows')
    cy.findByLabelText('Stack items').type(shuffle(rankings).join('\n'))
    cy.findByRole('button', { name: 'Let’s Rank' }).click()
    cy.location('pathname').should('match', /^\/stacks\/\w+$/)
  })
})
