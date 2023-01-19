import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('mounts', () => {
    cy.mount(<LoginForm onLogin={() => {}} />);
  });

  it('when email and password are empty, validation messages should appear', () => {
    cy.mount(<LoginForm onLogin={cy.spy().as('onLoginSpy')} />);
    cy.get('button').click();
    cy.contains('Email is required');
    cy.contains('Password is required');
    cy.get('@onLoginSpy').should('not.have.been.called');
  });

  it('when email is not a valid email, a validation message should appear', () => {
    cy.mount(<LoginForm onLogin={cy.spy().as('onLoginSpy')} />);
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('button').click();
    cy.contains('Email is not valid');
    cy.get('@onLoginSpy').should('not.have.been.called');
  });

  it('when email and password are valid, onLogin should be called', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/auth',
      },
      {
        statusCode: 200,
        body: {
          access_token: 'abc123',
          user: {
            id: 1,
            name: 'test user',
          },
          expiresAt: new Date().getTime() / 1000 + 86400,
        },
      }
    );

    cy.mount(<LoginForm onLogin={cy.spy().as('onLoginSpy')} />);
    cy.get('input[type="email"]').type('test@user.com');
    cy.get('input[type="password"]').type('pass123');
    cy.get('button').click();
    cy.get('@onLoginSpy').should('have.been.called');
  });

  it('when email and password are invalid, an error should show', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/auth',
      },
      {
        statusCode: 401,
      }
    );

    cy.mount(<LoginForm onLogin={cy.spy().as('onLoginSpy')} />);
    cy.get('input[type="email"]').type('test@user.com');
    cy.get('input[type="password"]').type('pass123');
    cy.get('button').click();
    cy.contains('Invalid email or password');
  });
});
