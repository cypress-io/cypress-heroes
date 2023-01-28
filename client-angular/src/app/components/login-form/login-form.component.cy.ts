import { createOutputSpy } from 'cypress/angular';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginForm', () => {
  it('should mount', () => {
    cy.mount('<app-login-form></app-login-form>');
  });

  it('should show validation messages when inputs are blank', () => {
    cy.mount('<app-login-form></app-login-form>');
    cy.get('button').contains('Sign in').click();

    cy.contains('Email is required.');
    cy.contains('Password is required.');
  });

  it('should show validation messages when email value is invalid', () => {
    cy.mount('<app-login-form></app-login-form>');
    cy.get('input[type=email]').type('aaabbb');
    cy.get('button').contains('Sign in').click();
    cy.contains('Email must be a valid email address.');
  });

  it('should not try to authenticate if the form fields are invalid', () => {
    cy.mount('<app-login-form></app-login-form>', {
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: cy.spy().as('loginSpy'),
          },
        },
      ],
    });

    cy.get('button').contains('Sign in').click();
    cy.get('@loginSpy').should('not.have.been.called');
  });

  it('should show bad login message when credentials are invalid', () => {
    cy.intercept('POST', '/auth', {
      statusCode: 401,
    });

    cy.mount('<app-login-form></app-login-form>');
    cy.get('button').contains('Sign in').click();

    cy.get('input[type=email]').type('bad@email.com');
    cy.get('input[type=password]').type('badpass');
    cy.get('button').contains('Sign in').click();

    cy.contains('Invalid username or password');
  });

  it('should login when credentials are valid', () => {
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
    cy.get('input[type=password]').type('goodpass');

    cy.get('button').contains('Sign in').click();

    cy.get('@onLoginSpy').should('have.been.called');
  });
});
