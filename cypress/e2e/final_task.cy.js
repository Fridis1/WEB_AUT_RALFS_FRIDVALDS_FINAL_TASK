import FinalTaskPage from '../Final_task_page';
const formPage = new FinalTaskPage();

describe('Automation Practice Form', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    formPage.visit();
  });

  it('Fills and submits form correctly', () => {
    cy.fixture('userData').then(user => {
      formPage.fillForm(user);
      formPage.submitForm();
      formPage.validateSubmission(user);
    });
  });
});