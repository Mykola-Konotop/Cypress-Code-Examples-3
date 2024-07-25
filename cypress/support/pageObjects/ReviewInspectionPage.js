class ReviewInspectionPage {

    getRequestCustomerToRedo()
    {
        return cy.get('.slick-current > .one_slide > .block_info > .checkbox_step > :nth-child(2) > .span_checkbox')
    }

    getMarkAsDamage()
    {
        return cy.get('.slick-current > .one_slide > .block_info > .checkbox_step > :nth-child(1) > .span_checkbox')
    }

    getCommentInspector()
    {
        return cy.get('.slick-current > .one_slide > .block_info > .comment_block > .comment_inspector_js')
    }

    getContinueButton()
    {
        return cy.get('.slick-current > .next_page')
    }

    getGlassDamageButton()
    {
        return cy.get('.next_glass_damage')
    }

    getNextTireDamageButton()
    {
        return cy.get('.slick-current > .next_tire')
    }

    getNextGlassDamage()
    {
        return cy.get('.slick-current > .next_glass_damage')
    }

}

export default ReviewInspectionPage