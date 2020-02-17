
describe('404 Page', () => {
  before(() => {
    cy.visit('/404', { failOnStatusCode: false })
  })

  it('should contain an error message', () => {
    cy.get('[data-cy=error-message]')
      .should('be.visible')
      .and('contain', 'Not Found')
  })
})
