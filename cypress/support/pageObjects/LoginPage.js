class LoginPage {

    getUsername()
    {
        return cy.get('#id_username')
    }

    getPassword()
    {
        return cy.get('#id_password')
    }

    submitButton()
    {
        return cy.get('.submit-row > input')
    }

}

export default LoginPage