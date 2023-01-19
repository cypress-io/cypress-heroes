import { HeroCreateModel, HeroViewModel } from '../../src/models/models';

//LEFT OFF - somewhere a hero isn't being cleaned up

describe('hereos endpoint', () => {
  it('should get a list of heroes', () => {
    cy.api('/heroes').as('request');
    cy.get('@request').its('status').should('equal', 200);
  });

  it('should get single hero', () => {
    cy.createHero();
    cy.get<HeroViewModel>('@newHero').then((newHero) => {
      cy.api(`/heroes/${newHero.id}`).as('response');
      cy.get('@response').its('status').should('equal', 200);
      cy.get('@response').its('body').should('deep.include', newHero);
      cy.deleteHero(newHero.id);
    });
  });

  it('should throw 404 if single hero is not found', () => {
    cy.api({
      url: '/heroes/10000000000',
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 404);
  });

  it('should throw 403 status code if POST is made while not authed', () => {
    cy.api({
      method: 'POST',
      url: '/heroes',
      body: {},
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 403);
  });

  it('should throw 403 status code if PUT is made while not authed', () => {
    cy.api({
      method: 'PUT',
      url: '/heroes/1',
      body: {},
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 403);
  });

  it('should throw 403 status code if DELETE is made while not authed', () => {
    cy.api({
      method: 'DELETE',
      url: '/heroes/1',
      body: {},
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 403);
  });

  describe('requires auth', () => {
    beforeEach(() => {
      cy.login('admin@test.com', 'test123');
    });

    it('can add hero', () => {
      const hero: HeroCreateModel = {
        name: 'Test Hero',
        price: 1,
        saves: 1,
        fans: 1,
        powers: [1],
      };
      cy.api({
        method: 'POST',
        url: '/heroes',
        body: hero,
        headers: {
          authorization: `Bearer ${localStorage['accessToken']}`,
        },
      }).as('response');
      cy.get('@response').its('status').should('equal', 201);
      cy.get('@response')
        .its('body')
        .then((newHero) => {
          cy.wrap(newHero).should('deep.include', {
            ...hero,
            powers: [
              {
                id: 1,
                name: 'Flying',
              },
            ],
          });
          cy.deleteHero(newHero.id);
        });
    });

    it('can delete hero', () => {
      cy.createHero();
      cy.get<HeroViewModel>('@newHero').then((newHero) => {
        cy.api({
          method: 'DELETE',
          url: `/heroes/${newHero.id}`,
          headers: {
            authorization: `Bearer ${localStorage['accessToken']}`,
          },
        }).as('response');
        cy.get('@response').its('status').should('equal', 204);
      });
    });

    it('should update hero', () => {
      cy.createHero();
      cy.get<HeroViewModel>('@newHero').then((newHero) => {
        newHero.name = 'Test Hero Updated';
        newHero.price = 100;
        newHero.powers = [1] as any;
        cy.api({
          url: `/heroes/${newHero.id}`,
          method: 'PUT',
          body: newHero,
          headers: {
            authorization: `Bearer ${localStorage['accessToken']}`,
          },
        }).as('response');
        cy.get('@response').its('status').should('equal', 200);
        cy.get('@response')
          .its('body')
          .should('deep.include', {
            ...newHero,
            powers: [
              {
                id: 1,
                name: 'Flying',
              },
            ],
          });
        cy.deleteHero(newHero.id);
      });
    });

    it('can upload avatar image', () => {
      cy.createHero();
      cy.get<HeroViewModel>('@newHero').then((newHero) => {
        cy.fixture('avatar.png', 'binary').then((binaryString) => {
          const blob = Cypress.Blob.binaryStringToBlob(
            binaryString,
            'image/png',
          );
          const formData = new FormData();
          formData.append('avatar', blob);
          cy.request({
            method: 'POST',
            url: `/heroes/${newHero.id}/avatar`,
            body: formData,
            headers: {
              authorization: `Bearer ${localStorage['accessToken']}`,
              // 'content-type': 'multipart/form-data',
            },
            failOnStatusCode: false,
          });
          cy.api({
            url: `/heroes/${newHero.id}/avatar`,
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage['accessToken']}`,
            },
          }).as('response');
          cy.get('@response').its('status').should('equal', 200);
          cy.deleteHero(newHero.id);
        });
      });
    });
  });
});
