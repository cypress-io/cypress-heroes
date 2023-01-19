import { Prisma } from '../support/models';

describe('hero edit page', () => {
  beforeEach(() => {
    cy.createHero().then((hero) => {
      cy.visit(`/heroes/${hero.id}/edit`);
    });
  });

  afterEach(() => {
    cy.get<Prisma.Hero>('@newHero').then((newHero) => {
      cy.deleteHero(newHero.id);
    });
  });

  describe('when admin user is logged in', () => {
    beforeEach(() => {
      cy.login('admin@test.com', 'test123');
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.visit(`/heroes/${newHero.id}/edit`);
      });
    });

    it('should contain hero information', () => {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.get('[data-cy=price]').should('contain.text', `$${newHero.price}`);
        cy.get('[data-cy=fans]').should('contain.text', newHero.fans);
        cy.get('[data-cy=saves]').should('contain.text', newHero.saves);
        cy.get('[data-cy=name]').should('contain.text', newHero.name);
      });
    });

    it('editing hero should save and display on home page', () => {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.get('[data-cy=nameInput]').type(' edited');
        cy.get('[data-cy=priceInput]').clear().type('12');
        cy.get('[data-cy=fansInput]').clear().type('34');
        cy.get('[data-cy=savesInput]').clear().type('56');
        cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
        cy.get('button').contains('Submit').click();
        cy.location('pathname').should('equal', `/heroes`);
        cy.contains('[data-cy=hero-card]', newHero.name + ' edited')
          .as('heroCard')
          .should('exist');
        cy.get('@heroCard')
          .find('[data-cy=name]')
          .should('contain', newHero.name + ' edited');
        cy.get('@heroCard').find('[data-cy=price]').should('contain', '12');
        cy.get('@heroCard').find('[data-cy=fans]').should('contain', '34');
        cy.get('@heroCard').find('[data-cy=saves]').should('contain', '56');
        cy.get('@heroCard')
          .find('[data-cy=powers]')
          .should('contain.text', 'Fireball')
          .and('contain.text', 'Super Strength');
      });
    });

    it('should be able to upload new avatar', () => {
      cy.get<Prisma.Hero>('@newHero').then((newHero) => {
        cy.get('[data-cy=avatarFile]').selectFile(
          './cypress/fixtures/avatar.jpg'
        );
        cy.get('button').contains('Submit').click();
        cy.contains('[data-cy=hero-card]', newHero.name)
          .as('heroCard')
          .find('img')
          .should('have.attr', 'src')
          .and('include', `heroes/${newHero.id}/avatar`);
      });
    });
  });
});
