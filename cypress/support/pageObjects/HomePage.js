class HomePage {

    getTitle()
    {
        return cy.get('#content > h1')
    }

    getAddLink()
    {
        return cy.get('.model-importuser > :nth-child(2) > .addlink')
    }

    getChangeLink()
    {
        return cy.get('.model-importuser > :nth-child(3) > .changelink')
    }

}

export default HomePage