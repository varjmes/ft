describe('Searching for headlines', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has no detectable acessibility violations on load', () => {
    cy.search('pizza')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('should submit the form when on enter key', () => {
    cy.search('james', true)

    cy.get('[data-cy=results-header]')
      .should('be.visible')
      .and('contain', 'Search results for "james"')

    cy.get('[data-cy=results-list]')
      .children()
      .should('have.length', 20)
  })

  it('should submit the form on click of submit button', () => {
    cy.search('eggs')

    cy.get('[data-cy=results-header]')
      .should('be.visible')
      .and('contain', 'Search results for "eggs"')

    cy.get('[data-cy=results-list]')
      .children()
      .should('have.length', 20)
  })

  it('should say no results when no results are found', () => {
    cy.search('noop')

    cy.get('[data-cy=results-header]')
      .should('be.visible')
      .and('contain', 'No results found for "noop"')

    cy.get('[data-cy=results-list]')
      .should('not.exist')
  })
})
