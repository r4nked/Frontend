import rankings from '../fixtures/rankings'
import { times, trim } from 'lodash-es'

function makeChoices() {
  cy.findByTestId('firstChoice').then((first) => {
    cy.findByTestId('secondChoice').then((second) => {
      const firstIndex = rankings.indexOf(trim(first.text()))
      const secondIndex = rankings.indexOf(trim(second.text()))
      if (firstIndex > secondIndex) cy.findByTestId('secondChoice').click()
      else cy.findByTestId('firstChoice').click()
    })
  })
}

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1)
}

describe('Ranking things', () => {
  beforeEach(() => cy.request('GET', `${Cypress.env('apiHost')}/cypress/reset`))

  it('displays results when finished', () => {
    cy.visit('/stacks/1')

    const numRankings = rankings.length
    times(factorial(numRankings) / (factorial(numRankings - 2) * 2), makeChoices)

    cy.findByRole('heading', { level: 1 }).should('contain', 'Sci-fi shows, ranked.')
    cy.findByRole('list')
      .get('li')
      .then((lis) => {
        const resultRankings = lis.get().map((e) => trim(e.textContent!))
        expect(resultRankings).to.eql(rankings)
      })
  })

  it('displays results early', () => {
    cy.visit('/stacks/1')

    times(10, makeChoices)
    cy.findByText(/see your results right now/).click()
    cy.findByRole('heading', { level: 1 }).should('contain', 'Sci-fi shows, ranked.')
    cy.findByRole('list').get('li').should('exist')
  })
})
