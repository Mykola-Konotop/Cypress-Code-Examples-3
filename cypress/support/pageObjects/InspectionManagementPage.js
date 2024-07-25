class InspectionManagementPage {

    getRequestId()
    {
        return cy.get(':nth-child(1) > .field-request_id > a')
    }

    getVehicleVin()
    {
        return cy.get(':nth-child(1) > .field-vehicle_vin')
    }

    getCarInfo()
    {
        return cy.get(':nth-child(1) > .field-name_car')
    }

    getSuccessMessage()
    {
        return cy.get('.success')
    }

    getStatusInspection()
    {
        return cy.get(':nth-child(1) > .field-status_inspection_progress')
    }

    getReviewInspectionButton()
    {
        return cy.get(':nth-child(1) > .field-review_inspection > .button_inspection')
    }

    getDamageButton()
    {
        return cy.get(':nth-child(1) > .field-review_damage > .button_inspection')
    }

    getSendInspectionButton()
    {
        return cy.get(':nth-child(1) > .field-send_message > .button_inspection')
    }

    getReportButton()
    {
        return cy.get(':nth-child(1) > .field-report > .button_inspection')
    }

}

export default InspectionManagementPage