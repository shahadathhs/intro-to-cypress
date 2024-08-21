describe('forms tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('Test Subscribe Form', () => {
    const email = 'sajib1@gmail.com';
    cy.contains(/testing forms/i)
    cy.getDataTest('subscribe-form').find('input').as('subscribe-input')
    
    cy.get('@subscribe-input').type(email)
    cy.contains(/successfully subbed:/i).should('not.exist')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/successfully subbed:/i).should('exist')
    cy.wait(3000);
    cy.contains(/successfully subbed:/i).should('not.exist')

    cy.get('@subscribe-input').type('sajib@rayan.io')
    cy.contains(/invalid email:/i).should('not.exist')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/invalid email:/i).should('exist')
    cy.wait(3000);
    cy.contains(/invalid email:/i).should('not.exist')

    cy.contains(/fail!/i).should('not.exist')
    cy.getDataTest('subscribe-button').click()
    cy.contains(/fail!/i).should('exist')
  })
})