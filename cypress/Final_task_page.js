class FinalTaskPage {
  visit() {
    cy.visit('https://demoqa.com/automation-practice-form');
  }

  elements = {
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    gender: () => cy.get('label[for="gender-radio-3"]'), 
    mobile: () => cy.get('#userNumber'),
    dobInput: () => cy.get('#dateOfBirthInput'),
    subjectInput: () => cy.get('#subjectsInput'),
    hobbyMusic: () => cy.get('label[for="hobbies-checkbox-3"]'),
    uploadPicture: () => cy.get('#uploadPicture'),
    address: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitBtn: () => cy.get('#submit'),
    modal: () => cy.get('.modal-content'),
    modalRows: () => cy.get('tbody tr')
  }
    fillForm(user) {
    this.elements.firstName().type(user.firstName);
    this.elements.lastName().type(user.lastName);
    this.elements.email().type(user.email);
    this.elements.gender().click();
    this.elements.mobile().type(user.mobile);

    this.elements.dobInput().click();
    cy.get('.react-datepicker__year-select').select('1930');
    cy.get('.react-datepicker__month-select').select('February');
    cy.get('.react-datepicker__day--028:not(.react-datepicker__day--outside-month)').click();

    this.elements.subjectInput().type('Economics{enter}');
    this.elements.hobbyMusic().click();
    this.elements.uploadPicture().selectFile('cypress/files/profile_picture.jpg');
    this.elements.address().type(user.address);

    this.elements.stateDropdown().click();
    cy.contains('div', 'NCR').click();

    this.elements.cityDropdown().click();
    cy.contains('div', 'Delhi').click();
  }
   submitForm() {
    this.elements.submitBtn().click();
  }

  validateSubmission(user) {
    this.elements.modal().should('be.visible');
    const expectedValues = [
      `${user.firstName} ${user.lastName}`,
      user.email,
      'Other',
      user.mobile,
      '28 February,1930',
      'Economics',
      'Music',
      'profile_picture.jpg',
      user.address,
      'NCR Delhi'
    ];

    this.elements.modalRows().each(($row, index) => {
      cy.wrap($row).should('contain.text', expectedValues[index]);
    });
  }
}

export default FinalTaskPage;
