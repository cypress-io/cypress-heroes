import Prisma from '@prisma/client';

describe('home page', () => {
  beforeEach(() => {
    cy.createHero();
    cy.visit('/');
  });

  afterEach(() => {
    cy.get<Prisma.Hero>('@newHero').then((newHero) => {
      cy.deleteHero(newHero.id);
    });
  });

  describe('when not logged in', () => {
    it('clicking on like should alert the user they need to login', () => {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.contains('[data-cy=hero-card]', newHero.name)
          .find('button[data-cy=like]')
          .click();
        cy.contains('You must log in to like.');
        cy.get('button').contains('Ok').click();
        cy.contains('You must log in to like.').should('not.exist');
      });
    });

    it('clicking on hire should alert the user they need to login', () => {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.contains('[data-cy=hero-card]', newHero.name)
          .find('button[data-cy=money]')
          .click();
        cy.contains('You must log in to hire this hero.');
        cy.get('button').contains('Ok').click();
        cy.contains('You must log in to hire this hero.').should('not.exist');
      });
    });
  });

  describe('when normal user is logged in', () => {
    beforeEach(() => {
      cy.login('test@test.com', 'test123');
      cy.visit('/');
    });

    it('clicking like on a hero should increase their fan count', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //get current fan count of first hero
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .find('[data-cy=fans]')
          .as('fanSpan')
          .then((el) => {
            cy.wrap(el.text()).as('fanCount');
          });
        //click like button
        cy.get('@firstHero').find('[data-cy=like]').click();
        //assert count increased
        cy.get('@fanCount').then((fanCount) => {
          cy.get('@fanSpan').should('have.text', Number(fanCount) + 1);
        });
      });
    });

    it('user should be able to hire a hero', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //get current saves count of first hero
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .find('[data-cy=saves]')
          .as('saveSpan')
          .then((el) => {
            cy.wrap(el.text()).as('saveCount');
          });
        //click hire button
        cy.get('@firstHero').find('[data-cy=money]').click();
        //click yes in modal
        cy.get('button').contains('Yes').click();
        //assert count increased
        cy.get('@saveCount').then((saveCount) => {
          cy.get('@saveSpan').should('have.text', Number(saveCount) + 1);
        });
      });
    });

    it('user should be able to decline hiring a hero', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //get current saves count of first hero
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .find('[data-cy=saves]')
          .as('saveSpan')
          .then((el) => {
            cy.wrap(el.text()).as('saveCount');
          });
        //click hire button
        cy.get('@firstHero').find('[data-cy=money]').click();
        //click no in modal
        cy.get('button').contains('No').click();
        //assert count is the same
        cy.get('@saveCount').then((saveCount) => {
          cy.get('@saveSpan').should('have.text', Number(saveCount));
        });
      });
    });
  });

  describe('when admin user is logged in', () => {
    beforeEach(() => {
      cy.login('admin@test.com', 'test123');
      cy.visit('/');
    });

    it('clicking like on a hero should increase their fan count', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //get current fan count of first hero
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .find('[data-cy=fans]')
          .as('fanSpan')
          .then((el) => {
            cy.wrap(el.text()).as('fanCount');
          });
        //click like button
        cy.get('@firstHero').find('[data-cy=like]').click();
        //assert count increased
        cy.get('@fanCount').then((fanCount) => {
          cy.get('@fanSpan').should('have.text', Number(fanCount) + 1);
        });
      });
    });

    it('admin should be able to hire a hero', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //get current saves count of first hero
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .find('[data-cy=saves]')
          .as('saveSpan')
          .then((el) => {
            cy.wrap(el.text()).as('saveCount');
          });
        //click hire button
        cy.get('@firstHero').find('[data-cy=money]').click();
        //click yes in modal
        cy.get('button').contains('Yes').click();
        //assert count increased
        cy.get('@saveCount').then((saveCount) => {
          cy.get('@saveSpan').should('have.text', Number(saveCount) + 1);
        });
      });
    });

    it('clicking edit on a hero should redirect to edit page', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //click edit button
        cy.contains('[data-cy=hero-card]', newHero.name)
          .find('[data-cy=pencil]')
          .click();
        cy.location('pathname').should('equal', `/heroes/${newHero.id}/edit`);
      });
    });

    it('admin should be able to delete a hero', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //click delete button
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('firstHero')
          .then((el) => {
            cy.wrap(el)
              .find('[data-cy=name]')
              .invoke('text')
              .then((text) => cy.wrap(text).as('heroName'));
          });
        cy.get('@firstHero').find('[data-cy=trash]').click();
        cy.contains('Delete Hero?');
        //click no
        cy.get('button').contains('Yes').click();
        //hero should be gone
        cy.get<string>('@heroName').then((name) => {
          cy.getByCy('hero-card').contains(name).should('not.exist');
        });
      });
    });

    it('admin should be able to decline deleting a hero', function () {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        //click delete button
        cy.contains('[data-cy=hero-card]', newHero.name)
          .find('[data-cy=trash]')
          .click();
        cy.contains('Delete Hero?');
        //click no
        cy.get('button').contains('No').click();
      });
    });
  });
});
