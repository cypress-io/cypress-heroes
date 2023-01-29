import { createOutputSpy } from 'cypress/angular';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginForm', () => {
  it('should mount', () => {
    cy.mount('<app-login-form></app-login-form>');
  });

  it('when email and password are empty, validation messages should appear', () => {
    cy.mount(
      '<app-login-form (onLogin)="onLogin.emit($event)"></app-login-form>',
      {
        componentProperties: {
          onLogin: createOutputSpy('onLoginSpy'),
        },
      }
    );
    cy.get('button').contains('Sign in').click();

    cy.contains('Email is required');
    cy.contains('Password is required');
    cy.get('@onLoginSpy').should('not.have.been.called');
  });

  it('when email is not a valid email, a validation message should appear', () => {
    cy.mount(
      '<app-login-form (onLogin)="onLogin.emit($event)"></app-login-form>',
      {
        componentProperties: {
          onLogin: createOutputSpy('onLoginSpy'),
        },
      }
    );
    cy.get('input[type=email]').type('invalidemail');
    cy.get('button').contains('Sign in').click();
    cy.contains('Email is not valid');
    cy.get('@onLoginSpy').should('not.have.been.called');
  });

  it('when email and password are valid, onLogin should be called', () => {
    cy.intercept('POST', '/auth', {
      statusCode: 200,
      body: {},
    });

    cy.mount(
      '<app-login-form (onLogin)="onLogin.emit($event)"></app-login-form>',
      {
        componentProperties: {
          onLogin: createOutputSpy('onLoginSpy'),
        },
      }
    );

    cy.get('input[type=email]').type('good@email.com');
    cy.get('input[type=password]').type('pass123');
    cy.get('button').contains('Sign in').click();
    cy.get('@onLoginSpy').should('have.been.called');
  });

  it('when email and password are invalid, an error should show', () => {
    cy.intercept('POST', '/auth', {
      statusCode: 401,
    });

    cy.mount('<app-login-form></app-login-form>');
    cy.get('button').contains('Sign in').click();

    cy.get('input[type=email]').type('bad@email.com');
    cy.get('input[type=password]').type('pass123');
    cy.get('button').contains('Sign in').click();

    cy.contains('Invalid username or password');
  });

});
