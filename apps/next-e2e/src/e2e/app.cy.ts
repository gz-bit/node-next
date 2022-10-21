describe('next', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Balbasaur', () => {
    
    cy.get('input').first().type('bulb')
    cy.get('li').first().should('have.text', 'Balbasaur')
    
  });
});

// This test does not work!