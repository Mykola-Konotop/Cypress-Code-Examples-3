class InspectionFlowPage {

    getTitle()
    {
        return cy.get('.content > .title')
    }

    getTitleList()
    {
        return cy.get('.title_list')
    }

    getToDoOne()
    {
        return cy.get('.list_title > :nth-child(1)')
    }

    getToDoTwo()
    {
        return cy.get('.list_title > :nth-child(2)')
    }

    getToDoThree()
    {
        return cy.get('.list_title > :nth-child(3)')
    }

    getBigButton()
    {
        return cy.get('.big_button')
    }
    
    getText()
    {
        return cy.get('.text')
    }

    getPhotoTitle()
    {
        return cy.get('.example_photo > .title')
    }

    getBlockText()
    {
        return cy.get('.block_text')
    }

    getLeftBlockTitle()
    {
        return cy.get('.left_block > .title')
    }

    getTakePhotoButton()
    {
        return cy.get('#takePhotoButton')
    }

    getCommentDamage()
    {
        return cy.get('#comment_damage')
    }

    getOkButton()
    {
        return cy.get('.button_ok')
    }

    getNextButton()
    {
        return cy.get('.next')
    }

    getBackButton()
    {
        return cy.get('.back_page')
    }

    getYesButton()
    {
        return cy.get('.button_yes')
    }

    getNoButton()
    {
        return cy.get('.button_no')
    }

    getContinueButton()
    {
        return cy.get('.next_page_additional')
    }

    getErrorTitle()
    {
        return cy.get('.swal-title')
    }

    getErrorText()
    {
        return cy.get('.swal-text')
    }

    getContinue()
    {
        return cy.get('.custom')
    }

    getPhotoTitleTwo()
    {
        return cy.get('.page_red_button > .left_block > .example_photo > .title')
    }

    getSubmitMiles()
    {
        return cy.get('.submit_miles')
    }
    
    getErrorOkButton()
    {
        return cy.get('.swal-button')
    }
}

export default InspectionFlowPage