import { Button } from './Button';

describe('Button', () => {
  it('should mount with text', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('have.text', 'Click me');
  });

  it('should not be focused when focus is falsey', () => {
    cy.mount(<Button>Click me</Button>);
    cy.focused().should('not.exist');
  });

  it('should be focused when focus is true', () => {
    cy.mount(<Button focus={true}>Click me</Button>);
    cy.focused().should('have.text', 'Click me');
  });

  it('should respond to click event', () => {
    cy.mount(<Button onClick={cy.spy().as('onClickSpy')}>Click me</Button>);
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
