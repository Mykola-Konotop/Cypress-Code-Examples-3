/// <reference types="cypress" />

import LoginPage from '../support/pageObjects/LoginPage'
const loginPage = new LoginPage();

describe('Login fail test case', () => {
  it('Login fail (SI-TC-2)', () => {
    cy.visit('/login/')
    loginPage.getUsername().type(Cypress.env('userName2'), { log: false })
    loginPage.getPassword().type(Cypress.env('password'), { log: false })
    loginPage.submitButton().click()
    cy.get('.errornote').should('include.text', 'enter the correct username and password')
  })
})