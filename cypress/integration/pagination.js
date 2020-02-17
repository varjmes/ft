describe('Pagination', () => {
  before(() => {
    cy.visit('/')
  })

  it('should go to the next page of results', () => {
    cy.search('james', true)

    cy.get('[data-cy=next]')
      .first()
      .contains('Next page')
      .should('have.attr', 'href')
      .and('include', '/search?q=james&index=20')

    cy.get('[data-cy=next]').first().click()

    cy.get('[data-cy=results-list]')
      .children()
      .should('have.length', 20)

    cy.url().should('include', 'search?q=james&index=20')
  })

  it('should go to the previous page of results', () => {
    cy.get('[data-cy=previous]')
      .first()
      .contains('Previous page')
      .should('have.attr', 'href')
      .and('include', '/search?q=james&index=0')

    cy.get('[data-cy=previous]').first().click()

    cy.get('[data-cy=results-list]')
      .children()
      .should('have.length', 20)

    cy.url().should('include', 'search?q=james&index=0')
  })
})
