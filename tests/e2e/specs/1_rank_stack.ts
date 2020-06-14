import rankings from '../rankings.ts'

const { _ } = Cypress

function makeChoices() {
  cy.dataCy('firstChoice').then(first => {
    cy.dataCy('secondChoice').then(second => {
      const firstIndex = rankings.indexOf(_.trim(first.text()))
      const secondIndex = rankings.indexOf(_.trim(second.text()))
      if (firstIndex > secondIndex) cy.dataCy('secondChoice').click()
      else cy.dataCy('firstChoice').click()
    })
  })
}

function factorial(n: number): number {
  if (n === 0) return 0
  if (n === 1) return 1
  return n * factorial(n - 1)
}

describe('Ranking things', () => {
  it('displays results when finished', () => {
    const numRankings = rankings.length
    _.times(factorial(numRankings) / (factorial(numRankings - 2) * 2), makeChoices)

    cy.dataCy('resultsHeader').should('contain', 'Sci-fi shows, ranked.')
    cy.dataCy('resultsList').get('li').then(lis => {
      const resultRankings = lis.get().map(e => _.trim(e.textContent!))
      expect(resultRankings).to.eql(rankings)
    })
  })

  it('displays results early', () => {
    cy.dataCy('retestURL').invoke('text').then(url => {
      cy.visit(url)
      _.times(10, makeChoices)

      cy.dataCy('earlyResultsLink').click()
      cy.dataCy('resultsHeader').should('contain', 'Sci-fi shows, ranked.')
      cy.dataCy('resultsList').get('li').should('exist')
    })
  })
})
