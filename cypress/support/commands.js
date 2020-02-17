Cypress.Commands.add('search', (term, enter = false) => {
  cy.get('input[type=search]')
    .type(`${term}${enter ? '{enter}' : ''}`)

  if (!enter) {
    cy.get('button')
      .contains('Search')
      .click()
  }

  cy.url().should('include', term)
})
