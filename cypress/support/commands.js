import LoginPage from '../support/pageObjects/LoginPage'
import HomePage from '../support/pageObjects/HomePage'
const loginPage = new LoginPage();
const homePage = new HomePage();

Cypress.Commands.add('login', () => {
    cy.session(
      'userSession',
      () => {
        cy.visit('/login/')
        loginPage.getUsername().type(Cypress.env('userName1'), { log: false })
        loginPage.getPassword().type(Cypress.env('password'), { log: false })
        loginPage.submitButton().click()
        cy.url().should('include', '/engine')
        homePage.getTitle().should('contain','administration')
      },
      {
        validate: () => {
          cy.getCookie('sessionid').should('exist')
        },
    })
})