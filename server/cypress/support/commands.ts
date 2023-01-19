// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { HeroViewModel } from '../../src/models/models';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      login(username: string, password: string): void;
      resetDb(): void;
      createHero(): void;
      deleteHero(id: number): void;
    }
  }
}

Cypress.Commands.add('login', (username, password) => {
  cy.session(
    `auth-${username}`,
    () => {
      cy.log('logging in');
      cy.request({
        method: 'POST',
        url: '/auth',
        body: {
          username,
          password,
        },
        log: false,
      }).then((sub) => {
        localStorage['accessToken'] = sub.body.access_token;
      });
    },
    {
      cacheAcrossSpecs: true,
    },
  );
});

Cypress.Commands.add('resetDb', () => {
  cy.exec(
    'npx prisma migrate reset --skip-seed -f && npx prisma db push && npx prisma db seed',
  );
});

Cypress.Commands.add('createHero', () => {
  cy.task('createHero').then((newHero: HeroViewModel) => {
    delete newHero.createdAt;
    delete newHero.updatedAt;
    delete newHero.avatar;
    cy.wrap(newHero).as('newHero');
  });
});

Cypress.Commands.add('deleteHero', (id: number) => {
  cy.task('deleteHero', id);
});

export {};
