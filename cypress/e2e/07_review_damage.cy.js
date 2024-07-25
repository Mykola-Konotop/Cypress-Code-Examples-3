/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import ReviewInspectionPage from '../support/pageObjects/ReviewInspectionPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const reviewInspectionPage = new ReviewInspectionPage();

describe('Review damage test case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })
    
    it('Review damage (SI-TC-17, SI-TC-19, SI-TC-32, SI-TC-34, SI-TC-35, SI-TC-42, SI-TC-51)', () => {
        Cypress.on('uncaught:exception', (err) => {
            expect(err.message).to.include('of undefined')
            
            return false;
          });
        cy.fixture('example').then(function(data) {
            this.data = data
        homePage.getChangeLink().click()
        inspectionManagementPage.getVehicleVin().should('have.text', this.data.vehicleVin)
        inspectionManagementPage.getCarInfo().should('include.text', this.data.vehicleYear)
        .should('include.text', this.data.vehicleMake).should('include.text', this.data.vehicleModel)
        inspectionManagementPage.getStatusInspection().should('have.text', 'In Review')
        inspectionManagementPage.getDamageButton()
        .should('include.text', 'Damage').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'check_all_damage')

        //steps tab
        cy.get('.info_car').click()
        cy.get(':nth-child(1) > .value_info').should('have.text', this.data.vehicleMake)
        cy.get(':nth-child(2) > .value_info').should('have.text', this.data.vehicleYear)
        cy.get(':nth-child(3) > .value_info').should('have.text', this.data.vehicleModel)
        cy.get(':nth-child(4) > .value_info').should('have.text', this.data.state)
        cy.get(':nth-child(5) > .value_info').should('have.text', this.data.vehicleVin)
        cy.get('.info_car_content > .modal-close').click()
        cy.get('#steps').should('have.text', 'Steps')
        cy.get('.final_note').type('Erased info label')
        cy.get('.next_page').click()
        cy.wait(1500)

        //Car damage tab
        cy.get('#glass_damage_2').should('have.text', 'Car damage')
        cy.get('#slick-slide30 > .block_photo_glass > .slide_glass > .name_glass_damage').should('have.text', 'Exterior')
        reviewInspectionPage.getGlassDamageButton().click()
        cy.wait(1500)

        //Tires damage tab
        cy.get('#tires').should('have.text', 'Tires damage')
        cy.get('.tires_step > .table_user > .slider > .slick-list > .slick-track > .slick-slide').should('have.text', 'TIRES INFO')
        cy.get(':nth-child(1) > .tires > .title_report').should('include.text', 'Left Front INFO').click()
        cy.get(':nth-child(1) > .tires > .content_report > .inputs_report > :nth-child(1) > .input-field > .validate').should('have.value', 'Left Front')
        cy.get(':nth-child(1) > .tires > .content_report > .inputs_report > .size > .input-field > .validate').should('have.value', '185/75/15')
        cy.get(':nth-child(2) > .tires > .title_report').should('include.text', 'Right Front INFO').click()
        cy.get(':nth-child(2) > .tires > .content_report > .inputs_report > :nth-child(1) > .input-field > .validate').should('have.value', 'Right Front')
        cy.get(':nth-child(2) > .tires > .content_report > .inputs_report > .size > .input-field > .validate').should('have.value', '185/75/15')
        cy.get(':nth-child(3) > .tires > .title_report').should('include.text', 'Left Rear INFO').click()
        cy.get(':nth-child(3) > .tires > .content_report > .inputs_report > :nth-child(1) > .input-field > .validate').should('have.value', 'Left Rear')
        cy.get(':nth-child(3) > .tires > .content_report > .inputs_report > .size > .input-field > .validate').should('have.value', '185/75/15')
        cy.get(':nth-child(4) > .tires > .title_report').should('include.text', 'Right Rear INFO').click()
        cy.get(':nth-child(4) > .tires > .content_report > .inputs_report > :nth-child(1) > .input-field > .validate').should('have.value', 'Right Rear')
        cy.get(':nth-child(4) > .tires > .content_report > .inputs_report > .size > .input-field > .validate').should('have.value', '185/75/15')
        cy.get(':nth-child(5) > .tires > .title_report').should('include.text', 'Spare Tire INFO').click()
        cy.get(':nth-child(5) > .tires > .content_report > .inputs_report > :nth-child(1) > .input-field > .validate').should('have.value', 'Spare Tire')
        cy.get(':nth-child(5) > .tires > .content_report > .inputs_report > .size > .input-field > .validate').should('have.value', '185/75/15')
        cy.get('.next_tire').click()

        inspectionManagementPage.getStatusInspection().should('have.text', 'Completed')
        })
    })
})