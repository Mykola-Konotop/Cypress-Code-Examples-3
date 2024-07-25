/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import ReviewInspectionPage from '../support/pageObjects/ReviewInspectionPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const reviewInspectionPage = new ReviewInspectionPage();

describe('Review inspection test case', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })
    
    it('Review inspection (SI-TC-17, SI-TC-19, SI-TC-32, SI-TC-34, SI-TC-35, SI-TC-42, SI-TC-51)', () => {
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
        inspectionManagementPage.getReviewInspectionButton()
          .should('include.text', 'Review').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'check_pages_all')

        //steps tab
        cy.get('.info_car').click()
        cy.get(':nth-child(1) > .value_info').should('have.text', this.data.vehicleMake)
        cy.get(':nth-child(2) > .value_info').should('have.text', this.data.vehicleYear)
        cy.get(':nth-child(3) > .value_info').should('have.text', this.data.vehicleModel)
        cy.get(':nth-child(4) > .value_info').should('have.text', this.data.state)
        cy.get(':nth-child(5) > .value_info').should('have.text', this.data.vehicleVin)
        cy.get('.info_car_content > .modal-close').click()
        cy.get('#steps').should('have.text', 'Steps')
        reviewInspectionPage.getMarkAsDamage().click()
        for (let i = 0; i < 3; i++) {
            reviewInspectionPage.getContinueButton().click()
            cy.wait(1500)
            }
        reviewInspectionPage.getRequestCustomerToRedo().click()
        reviewInspectionPage.getCommentInspector().type('Blurred image, please repeat!')
        for (let i = 0; i < 65; i++) {
            reviewInspectionPage.getContinueButton().click()
            cy.wait(1500)
            }
        
        //Car damage tab
        cy.get('#glass_damage').should('have.text', 'Car damage')
        cy.get('#slick-slide30 > .name_glass_damage').should('have.text', 'Exterior')
        cy.get('.back_glass_damage').click()
        cy.wait(1500)
        reviewInspectionPage.getContinueButton().click()
        cy.wait(1500)
        reviewInspectionPage.getGlassDamageButton().click()
        cy.wait(1500)

        //Tire damage tab
        cy.get('#tires').should('have.text', 'Tire damage')
        for (let i = 0; i < 8; i++) {
            reviewInspectionPage.getNextTireDamageButton().click()
            cy.wait(1500)
            }
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(1) > .name_steps').should('have.text', 'Left Front')
        cy.get(':nth-child(1) > .select_brand > .select-wrapper').contains('Continental').click({force: true})
        cy.get(':nth-child(1) > .select_tire_damage > .select-wrapper').contains('Needs replacement').click({force: true})
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(1) > .col_tires.size_tire > .validate').type(this.data.tireSize)
        cy.get(':nth-child(1) > .select_tire_tread > .select-wrapper').contains('2/32"').click({force: true})
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(2) > .name_steps').should('have.text', 'Right Front')
        cy.get(':nth-child(2) > .select_brand > .select-wrapper').contains('Continental').click({force: true})
        cy.get(':nth-child(2) > .select_tire_damage > .select-wrapper').contains('Needs replacement').click({force: true})
        cy.get(':nth-child(2) > .select_tire_tread > .select-wrapper').contains('3/32"').click({force: true})
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(3) > .name_steps').should('have.text', 'Left Rear')
        cy.get(':nth-child(3) > .select_brand > .select-wrapper').contains('Continental').click({force: true})
        cy.get(':nth-child(3) > .select_tire_damage > .select-wrapper').contains('Tire damage').click({force: true})
        cy.get(':nth-child(3) > .select_tire_tread > .select-wrapper').contains('4/32"').click({force: true})
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(3) > .tire_comment > .comment').type('Damage!')
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(4) > .name_steps').should('have.text', 'Right Rear')
        cy.get(':nth-child(4) > .select_brand > .select-wrapper').contains('Continental').click({force: true})
        cy.get(':nth-child(4) > .select_tire_tread > .select-wrapper').contains('8/32"').click({force: true})
        cy.get('.main_table > .table_tires > .steps_tires > :nth-child(5) > .name_steps').should('have.text', 'Spare Tire')
        cy.get(':nth-child(5) > .select_brand > .select-wrapper').contains('Bridgestone').click({force: true})
        cy.get(':nth-child(5) > .select_tire_tread > .select-wrapper').contains('11/32"').click({force: true})
        cy.get('.last_tab_next').click()

        inspectionManagementPage.getStatusInspection().should('have.text', 'In Progress')
        })
    })
})