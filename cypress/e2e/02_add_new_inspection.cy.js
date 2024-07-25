/// <reference types="cypress" />

import HomePage from '../support/pageObjects/HomePage'
import InspectionManagementPage from '../support/pageObjects/InspectionManagementPage'
import ChangeInspectionPage from '../support/pageObjects/ChangeInspectionPage'
import InspectionFlowPage from '../support/pageObjects/InspectionFlowPage'
const homePage = new HomePage();
const inspectionManagementPage = new InspectionManagementPage();
const changeInspectionPage = new ChangeInspectionPage();
const inspectionFlowPage = new InspectionFlowPage();

describe('Add new inspection & Start inspection flow test cases', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    })
    
    it('Add new inspection (SI-TC-1, SI-TC-4, SI-TC-46)', () => {
      cy.fixture('example').then(function(data) {
        this.data = data
        homePage.getAddLink().click()
        changeInspectionPage.getFirstName().type(this.data.firstName)
        changeInspectionPage.getLastName().type(this.data.lastName)
        changeInspectionPage.getAddress().type(this.data.address)
        changeInspectionPage.getState().type(this.data.state)
        changeInspectionPage.getCity().type(this.data.city)
        changeInspectionPage.getZipCode().type(this.data.zip)
        changeInspectionPage.getPhone().type(this.data.phone)
        changeInspectionPage.getEmail().type(Cypress.env('email'), { log: false })
        changeInspectionPage.getVehicleVin().type(this.data.vehicleVin)
        changeInspectionPage.getVehicleMake().type(this.data.vehicleMake)
        changeInspectionPage.getVehicleModel().type(this.data.vehicleModel)
        changeInspectionPage.getVehicleYear().type(this.data.vehicleYear)
        changeInspectionPage.getVehicleColor().type(this.data.vehicleColor)
        changeInspectionPage.getVehicleEngine().type(this.data.vehicleEngine)
        changeInspectionPage.getBodyType().type(this.data.bodyType)
        changeInspectionPage.getTransmission().type(this.data.transmission)
        changeInspectionPage.getMessageForInspector().type(this.data.body)
        changeInspectionPage.getSaveButton().click()
        inspectionManagementPage.getSuccessMessage().should('include.text', 'was added successfully')
        })
    })

    it('Start inspection flow (SI-TC-1, SI-TC-4, SI-TC-46)', () => {
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
        inspectionFlowPage.getContinue().click()
        inspectionFlowPage.getErrorTitle().should('have.text', 'Error')
        inspectionFlowPage.getErrorText()
        .should('have.text', 'VIN is a 17-digit code of letters and numbers that identifies a car uniquely')
        cy.get('.swal-button').should('have.text', 'OK').click()
        cy.get('.vin_code_input').type(this.data.vehicleVin)
        inspectionFlowPage.getContinue().click()
        cy.wait(1000)

        //car damage page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have any damage on the car?')
        inspectionFlowPage.getText().should('include.text', 'Please report all damages')
        inspectionFlowPage.getYesButton().click()

        //select car damage page
        cy.get('.title_select_car').should('include.text', 'Please select type of damage?')
        cy.get('[data-select_id="2"]').should('have.text', 'Exterior').click()
        cy.wait(2000)

        //car damage 1 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 1 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a picture of the entire exterior panel with damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Back to the previous page
        inspectionFlowPage.getBackButton().click()
        cy.wait(2000)
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 1 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a picture of the entire exterior panel with damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //car damage 2 page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'Exterior Damage 2 / 2')
        inspectionFlowPage.getBlockText().should('include.text', 'Take a close up picture of the damage')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //any car damage page
        inspectionFlowPage.getLeftBlockTitle().should('include.text', 'Do you have any damage on the car?')
        inspectionFlowPage.getNoButton().click()
        cy.wait(2000)

        //360 VIDEO page
        inspectionFlowPage.getText().should('include.text', 'Record a 360 video of your car by walking counterclockwise around the car.')
        cy.get('.close_additional_step').click()
        inspectionFlowPage.getPhotoTitleTwo().should('include.text', '360 VIDEO')
        inspectionFlowPage.getBlockText().should('include.text', 'Please align your camera with right angle of the car just like on the')
        inspectionFlowPage.getContinueButton().click()
        cy.get('#startButton').click()
        cy.wait(5000)
        cy.get('#stopButton').click()
        cy.wait(5000)
        inspectionFlowPage.getContinueButton().click()
        cy.wait(2000)

        //TIRE INFO LABEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'TIRE INFO LABEL')
        inspectionFlowPage.getBlockText().should('include.text', 'The tire and loading information label is found on the inside')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //FRONT SEATS page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'FRONT SEATS')
        inspectionFlowPage.getBlockText().should('include.text', 'Capture a photo of the front seats. With the driver door open')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DASH PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DASH PANEL')
        inspectionFlowPage.getBlockText().should('include.text', 'Capture the top surface of the dashboard panel. Note any cracks')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //VERIFY VEHICLE MILES AND ACTIVE DASH page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'VERIFY VEHICLE MILES AND ACTIVE DASH')
        inspectionFlowPage.getBlockText().should('include.text', 'Please start the vehicle and capture the complete cluster while')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getSubmitMiles().click()
        inspectionFlowPage.getErrorTitle().should('include.text', 'Please enter miles!')
        inspectionFlowPage.getErrorOkButton().click()
        cy.get('.miles_input_js').type(this.data.miles)
        inspectionFlowPage.getSubmitMiles().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //HEADLINER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'HEADLINER')
        inspectionFlowPage.getBlockText().should('include.text', 'Please take a photo of the headliner from the inside, focusing on the')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER DOOR HINGES page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER DOOR HINGES')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the driver's door hinges, capturing the view")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER DOOR PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER DOOR PANEL')
        inspectionFlowPage.getBlockText().should('include.text', 'Position yourself approximately 3 feet away. Level the camera to the')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER REAR DOOR HINGES page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER REAR DOOR HINGES')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the driver's rear door hinges, capturing the view")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER REAR WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER REAR WHEEL')
        inspectionFlowPage.getBlockText().should('include.text', "Level the camera with the left rear wheel to take a clear picture of the")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER REAR CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER REAR CORNER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 6 feet from the left rear corner of the car, and take a picture of")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR BUMPER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR BUMPER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 5 feet behind the car. Capture the entire rear bumper from the ground.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //TRUNK/TAILGATE EXTERIOR page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'TRUNK/TAILGATE EXTERIOR')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 6 feet behind the car, level the camera with the trunk/liftgate")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //SPARE TIRE COMPARTMENT page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'SPARE TIRE COMPARTMENT')
        inspectionFlowPage.getBlockText().should('include.text', "Capture a photo of the entire spare tire compartment where we can see")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER REAR RIGHT CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER REAR RIGHT CORNER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 6 feet from the rear right corner of the car, and take a picture")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //ROOF FROM PASSENGER REAR SIDE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'ROOF FROM PASSENGER REAR SIDE')
        inspectionFlowPage.getBlockText().should('include.text', "Stand at the rear right corner of the car and capture the entire roof")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER REAR WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER REAR WHEEL')
        inspectionFlowPage.getBlockText().should('include.text', "Level the camera with the right rear wheel to take a clear picture")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER REAR DOOR INTERIOR PANEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER REAR DOOR INTERIOR PANEL')
        inspectionFlowPage.getBlockText().should('include.text', "Open the passenger’s side rear door and position yourself approximately")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR SEATS page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR SEATS')
        inspectionFlowPage.getBlockText().should('include.text', "Open the passenger-side rear door and capture the rear seat and driver")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR DOOR HINGES page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR DOOR HINGES')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the passenger rear door hinges")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DASHBOARD page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DASHBOARD')
        inspectionFlowPage.getBlockText().should('include.text', "Capture a photo of the entire dashboard panel, including the steering")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER FRONT SEAT page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER FRONT SEAT')
        inspectionFlowPage.getBlockText().should('include.text', "Capture a photo of the passenger front seat. With the door open, include")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Back to the step DRIVER DOOR PANEL
        cy.get('.menu__btn').click()
        cy.get(':nth-child(9) > .name_step').should('include.text', "13.DRIVER DOOR PANEL")
        cy.get(':nth-child(9) > .take_step').click()
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER DOOR PANEL')
        inspectionFlowPage.getBlockText().should('include.text', 'Position yourself approximately 3 feet away. Level the camera to the')
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //HEADLINER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'HEADLINER')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the headliner from the inside, focusing on the")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER FRONT DOOR HINGES page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER FRONT DOOR HINGES')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the passenger front door hinges, capturing the view")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER SIDE FRONT WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER SIDE FRONT WHEEL')
        inspectionFlowPage.getBlockText().should('include.text', "Level the camera with the passenger front wheel to take a clear picture")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //RIGHT SIDE WINDSHIELD page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'RIGHT SIDE WINDSHIELD')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the entire windshield from the front passenger side.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER FRONT CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER FRONT CORNER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 6 feet from the passenger front corner of the car and take a picture")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //FRONT BUMPER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'FRONT BUMPER')
        inspectionFlowPage.getBlockText().should('include.text', "Level your camera with the front bumper, and capture a photo of the entire")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //HOOD FROM THE TOP page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'HOOD FROM THE TOP')
        inspectionFlowPage.getBlockText().should('include.text', "Close the hood, and capture a photo of the complete hood panel from a high")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER FRONT CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER FRONT CORNER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand 6 feet from the driver's front corner of the car and take a picture of")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER  FRONT WHEEL page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER  FRONT WHEEL')
        inspectionFlowPage.getBlockText().should('include.text', "Level the camera with the left front wheel to take a clear picture of the")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER SIDE WINDSHIELD page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER SIDE WINDSHIELD')
        inspectionFlowPage.getBlockText().should('include.text', "Please take a photo of the entire windshield from the driver's front side")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //ROOF FROM DRIVER CORNER page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'ROOF FROM DRIVER CORNER')
        inspectionFlowPage.getBlockText().should('include.text', "Stand next to the driver’s side mirror and capture the entire roof of the")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DRIVER SIDE LEFT UNDERCARRIAGE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DRIVER SIDE LEFT UNDERCARRIAGE')
        inspectionFlowPage.getBlockText().should('include.text', "From ground level, capture a picture of the driver-side undercarriage.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //REAR UNDERCARRIAGE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'REAR UNDERCARRIAGE')
        inspectionFlowPage.getBlockText().should('include.text', "From the ground level capture a picture of the rear undercarriage.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //PASSENGER SIDE FRONT UNDERCARRIAGE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'PASSENGER SIDE FRONT UNDERCARRIAGE')
        inspectionFlowPage.getBlockText().should('include.text', "From ground level, capture a picture of the passenger-side undercarriage.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //FRONT UNDERCARRIAGE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'FRONT UNDERCARRIAGE')
        inspectionFlowPage.getBlockText().should('include.text', "From the ground level capture a picture of the front undercarriage.")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //UNDER HOOD - PASSENGER FENDER APRON page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'UNDER HOOD - PASSENGER FENDER APRON')
        inspectionFlowPage.getBlockText().should('include.text', "With the hood open, capture an image of the passenger side fender apron")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //UNDER HOOD - DRIVER FENDER APRON page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'UNDER HOOD - DRIVER FENDER APRON')
        inspectionFlowPage.getBlockText().should('include.text', "With the hood open, capture an image of the driver-side fender apron in")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //HOOD FROM INSIDE page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'HOOD FROM INSIDE')
        inspectionFlowPage.getBlockText().should('include.text', "With the hood open, bring your camera to hip height, and angle the camera")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //ENGINE COMPARTMENT page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'ENGINE COMPARTMENT')
        inspectionFlowPage.getBlockText().should('include.text', "While the hood is open take a high angle view picture of the entire engine")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //DIP STICK AND OIL CAP page
        inspectionFlowPage.getPhotoTitle().should('include.text', 'DIP STICK AND OIL CAP')
        inspectionFlowPage.getBlockText().should('include.text', "After the engine has been test driven/brought up to regular operating temp")
        inspectionFlowPage.getTakePhotoButton().click()
        inspectionFlowPage.getNextButton().click()
        cy.wait(2000)

        //Thank you page
        inspectionFlowPage.getText().should('include.text', 'Your self inspection has been submitted.')
      })
    })
})