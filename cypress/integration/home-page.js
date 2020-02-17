
describe('Homepage', () => {
  before(() => {
    cy.visit('/')
  })

  it('should contain the app heading', () => {
    cy.get('[data-cy=title]')
      .should('be.visible')
      .and('contain', 'Headline search')
  })

  it('should contain the app subheading', () => {
    cy.get('[data-cy=subheading]')
      .should('be.visible')
      .and('contain', 'Search our headlines, today.')
  })

  it('should contain the headline search', () => {
    cy.get('input[type=search]').should('be.visible')
  })
})
