/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Chainable {}
  }
}

export {}
