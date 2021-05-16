/// <reference types="cypress" />

context('Capturaras', () => {
  beforeEach(() => {
    cy.visit('https://johancarvajalandes.github.io/color-palette/')
  })

  it('Color1', () => {

    cy.get('#generate').click()
    cy.screenshot('imagen1')

  })

  it('Color2', () => {
    cy.get('#generate').click()
    cy.screenshot('imagen2')

  })

 
})
