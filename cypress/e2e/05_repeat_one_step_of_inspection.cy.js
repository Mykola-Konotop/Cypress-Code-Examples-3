/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import InspectionFlowPage from '../support/pageObjects/InspectionFlowPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const inspectionFlowPage = new InspectionFlowPage();

describe('Repeat one step of inspection test case)', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    })

    it('Repeat one step of inspection (SI-TC-9, SI-TC-12))', () => {
        cy.fixture('example').then(function(data) {
          this.data = data
          homePage.getChangeLink().click()
          inspectionManagementPage.getVehicleVin().should('have.text', this.data.vehicleVin)
          inspectionManagementPage.getCarInfo().should('include.text', this.data.vehicleYear)
          .should('include.text', this.data.vehicleMake).should('include.text', this.data.vehicleModel)
          cy.get(':nth-child(1) > .field-inspection_link > .button_inspection').invoke('attr', 'data-link')
          .then(href => {
            cy.visit(href).viewport('samsung-s10', 'landscape');
          });
  
          //start page
          inspectionFlowPage.getTitle().should('include.text', 'Self-Inspection')
          inspectionFlowPage.getTitleList().should('have.text', 'Inspection to-do list')
          inspectionFlowPage.getToDoOne().should('have.text', 'Clean & empty car')
          inspectionFlowPage.getToDoTwo().should('have.text', 'Conduct inspection during daytime')
          inspectionFlowPage.getToDoThree().should('have.text', 'Park your car')
          inspectionFlowPage.getBigButton().should('include.text', 'Start Inspection').click()
          cy.wait(1000)
          cy.get('.img_vin').should('have.attr', 'src').should('include', '.png')
          inspectionFlowPage.getNextButton().click()
          cy.wait(1000)

          //vin number page
          cy.get('.hint_click_js').should('include.text', 'Here you can view the steps you have taken')
          inspectionFlowPage.getPhotoTitle().should('include.text', 'Vehicle Identification Number')
          inspectionFlowPage.getTakePhotoButton().click()
          inspectionFlowPage.getErrorTitle().should('have.text', 'Error')
          inspectionFlowPage.getErrorText().should('have.text', 'Failed to scanning! Try again')
          cy.get(':nth-child(1) > .swal-button').should('have.text', 'Enter VIN manually!').click()
          cy.get('.vin_code_input').type(this.data.vehicleVin)
          inspectionFlowPage.getContinue().click()
          cy.wait(1000)

          //VERIFY VEHICLE MILES AND ACTIVE DASH page
          inspectionFlowPage.getPhotoTitle().should('include.text', 'VERIFY VEHICLE MILES AND ACTIVE DASH')
          inspectionFlowPage.getBlockText().should('include.text', 'Please start the vehicle and capture the complete cluster while')
          inspectionFlowPage.getTakePhotoButton().click()
          cy.get('.miles_input_js').type(this.data.miles)
          inspectionFlowPage.getSubmitMiles().click()
          inspectionFlowPage.getNextButton().click()
          cy.wait(2000)

          //Thank you page
          inspectionFlowPage.getText().should('include.text', 'Your self inspection has been submitted.')
        })
    })
})