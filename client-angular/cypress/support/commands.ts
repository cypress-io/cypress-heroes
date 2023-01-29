/// <reference types="cypress" />
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { Prisma } from './models';
declare global {
  namespace Cypress {
    interface Chainable {
      login: (username: string, password: string) => {};
      getByCy<E extends Node = HTMLElement>(
        cyId: string
      ): Cypress.Chainable<JQuery<E>>;
      resetDb(): void;
      createHero(): Cypress.Chainable<Prisma.Hero>;
      deleteHero(id: number): void;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(`login-${username}`, () => {
    cy.visit('/');
    cy.get('button').contains('Login').click();
    cy.get('input[type="email"]').type(username);
    cy.get('input[type="password"]').type(password);
    cy.get('button').contains('Sign in').click();
    cy.contains('button', 'Logout', { log: false }).should('be.visible');
  });
});

Cypress.Commands.add('getByCy', (cyId: string) => {
  return cy.get(`[data-cy='${cyId}'`);
});

Cypress.Commands.add('resetDb', () => {
  cy.exec(
    'npx prisma migrate reset --skip-seed -f && npx prisma db push && npx prisma db seed'
  );
});

Cypress.Commands.add('createHero', () => {
  return cy.task('createHero').then((newHero: any) => {
    delete newHero.createdAt;
    delete newHero.updatedAt;
    delete newHero.avatar;
    return cy.wrap<Prisma.Hero>(newHero).as('newHero');
  });
});

Cypress.Commands.add('deleteHero', (id: number) => {
  cy.task('deleteHero', id);
});

export { };;
