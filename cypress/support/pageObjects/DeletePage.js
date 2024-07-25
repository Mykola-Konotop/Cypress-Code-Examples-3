class DeletePage {

    getDeleteLink()
    {
        return cy.get('.deletelink')
    }

    getSubmitButton()
    {
        return cy.get('[type="submit"]')
    }

}

export default DeletePage