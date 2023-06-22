import { SinonSpy } from 'cypress/types/sinon';
import HeroEditPage from './HeroEditPage';

describe('HeroEditPage', () => {
  const routePath = 'heroes/:id/edit';
  const initialPath = '/heroes/1/edit';

  const hero = {
    id: 1,
    name: 'Test Dude',
    price: 68,
    saves: 91,
    fans: 2,
    powers: [
      {
        id: 1,
      },
    ],
    avatarUrl: 'http://localhost:3001/heroes/3/avatar',
  };

  beforeEach(() => {
    cy.intercept('GET', '/heroes/1', hero);

    cy.intercept('GET', '/powers', [
      {
        id: 1,
        name: 'Flying',
      },
    ]);

    cy.intercept('PUT', '/heroes/1', { statusCode: 200, body: hero }).as(
      'updateRequest'
    );
  });

  it('navigates to the home page when hero is saved', () => {
    cy.mountWithProviders(<HeroEditPage />, routePath, initialPath);
    cy.get('button').contains('Submit').click();
    cy.get<SinonSpy>('@navigateSpy').should('have.been.calledWithMatch', {
      pathname: '/',
    });
  });

  it('when there is a server error, show a modal with error message', () => {
    cy.intercept('PUT', '/heroes/1', {
      statusCode: 500,
    });
    cy.mountWithProviders(<HeroEditPage />, routePath, initialPath);
    cy.get('button').contains('Submit').click();
    cy.contains('Something went wrong').should('be.visible');
  });
});
