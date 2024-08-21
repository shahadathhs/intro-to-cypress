describe('fundamental tests', () => {
  beforeEach(() => {
    cy.visit('/fundamentals');
  })

  it('Contains correct header text', () => {
    cy.get('[data-test="fundamentals-page"]').contains(/fundamental/i)
    cy.get('[data-test="fundamentals-page"]').should('contain.text', 'Fundamentals')
    cy.getDataTest('fundamentals-page').contains(/fundamental/i)
  });

  it('Accordian works correctly', () => {
    cy.contains(/Your tests will exist in a describe block./i).should('not.be.visible')
    cy.get('[data-test="accordian-id-1"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should('be.visible')
    cy.get('[data-test="accordian-id-1"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should('not.be.visible')
  });
})