describe('Example Page', () => {
  beforeEach(() => {
    cy.visit('/examples')
  });

  it('Contains correct header text', () => {
    cy.get('[data-test="examples-page"]').contains(/examples/i)
    cy.get('[data-test="examples-page"]').should('contain.text', 'Examples')
    cy.getDataTest('examples-page').contains(/examples/i)
  });

  it('multi-page testing part 1', () => {
    cy.getDataTest('nav-why-cypress').click();
    cy.location("pathname").should('equal', "/");

    cy.getDataTest('nav-overview').click();
    cy.location("pathname").should('equal', "/overview");

    cy.getDataTest('nav-fundamentals').click();
    cy.location("pathname").should('equal', "/fundamentals");

    cy.getDataTest('nav-forms').click();
    cy.location("pathname").should('equal', "/forms");
  });

  it("multi-page testing part 2", () => {
    cy.getDataTest('nav-examples').click();
    cy.location("pathname").should('equal', "/examples");

    cy.getDataTest('nav-component').click();
    cy.location("pathname").should('equal', "/component");

    cy.getDataTest('nav-best-practices').click();
    cy.location("pathname").should('equal', "/best-practices");
  });

  it("intercepts", () => {
    cy.intercept("POST", 'http://localhost:3000/examples', {
      body: {
        fixtures: 'example.json'
      }
    })
    cy.getDataTest('post-button').click();
  });

  it.only("grudges", () => {
    cy.contains(/add some grudges/i)

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0)
    })

    cy.getDataTest('clear-grudges-button').should('not.exist')

    cy.getDataTest('grudge-header').should('have.text', 'Add Some Grudges')

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('Some Grudge')
    })
    cy.getDataTest('add-grudge-button').click()
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1)
    })

    cy.getDataTest('grudge-header').should('have.text', 'Grudges')

    cy.getDataTest('clear-grudges-button').should('exist')

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('Some Grudge 2')
    })
    cy.getDataTest('add-grudge-button').click()
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2)
      cy.get('li').its(0).should('contains.text', 'Some Grudge')
    })

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').its(0).within(() => {
        cy.get('button').click()
      })
    })

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1)
    })

    cy.getDataTest('clear-grudges-button').click()

    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0)
    })
  })
})