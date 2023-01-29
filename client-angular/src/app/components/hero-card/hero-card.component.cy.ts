import { createOutputSpy } from 'cypress/angular';
import { Hero, User } from '../../services/models';

describe('HeroCard', () => {
  let hero: Hero;

  beforeEach(() => {
    hero = {
      id: 1,
      name: 'Test Hero',
      avatarUrl: 'http://placekitten.com/g/98/98',
      fans: 1,
      saves: 22,
      price: 5,
      powers: [
        {
          id: 1,
          name: 'Test Power 1',
        },
        {
          id: 2,
          name: 'Test Power 2',
        },
      ],
    };
  });

  it('mounts', () => {
    cy.mount('<li hero-card [hero]="hero"></li>', {
      componentProperties: {
        hero,
      },
    });
  });

  it('should contain hero information', () => {
    cy.mount('<li hero-card [hero]="hero"></li>', {
      componentProperties: {
        hero,
      },
    });
    cy.get('[data-cy=price]').should('contain.text', `$${hero.price}`);
    cy.get('[data-cy=fans]').should('contain.text', hero.fans);
    cy.get('[data-cy=saves]').should('contain.text', hero.saves);
    cy.get('[data-cy=name]').should('contain.text', hero.name);
    cy.get('[data-cy=powers]')
      .should('contain.text', hero.powers[0].name)
      .and('contain.text', hero.powers[1].name);
  });

  it('when hero has 2 or less powers, should NOT contain more text', () => {
    cy.mount('<li hero-card [hero]="hero"></li>', {
      componentProperties: {
        hero,
      },
    });
    cy.get('[data-cy=more]').should('not.exist');
  });

  it('when hero has more than 2 powers, should contain more text', () => {
    hero.powers.push({
      id: 3,
      name: 'Test Power 3',
    });
    cy.mount('<li hero-card [hero]="hero"></li>', {
      componentProperties: {
        hero,
      },
    });
    cy.get('[data-cy=more]').should('contain.text', '+1 more');
  });

  it('clicking like button should call onLikeHero', () => {
    cy.mount(
      '<li hero-card [hero]="hero" (onLikeHero)="onLikeHero.emit($event)"></li>',
      {
        componentProperties: {
          hero,
          onLikeHero: createOutputSpy('onLikeHero'),
        },
      }
    );
    cy.get('[data-cy=like]').click();
    cy.get('@onLikeHero').should('have.been.calledWith', hero);
  });

  it('clicking hire button should call onHireHero', () => {
    cy.mount(
      '<li hero-card [hero]="hero" (onHireHero)="onHireHero.emit($event)"></li>',
      {
        componentProperties: {
          hero,
          onHireHero: createOutputSpy('onHireHero'),
        },
      }
    );
    cy.get('[data-cy=money]').click();
    cy.get('@onHireHero').should('have.been.calledWith', hero);
  });

  it('when no user is logged in, edit and delete buttons should NOT exist', () => {
    cy.mount('<li hero-card [hero]="hero"></li>', {
      componentProperties: {
        hero,
      },
    });
    cy.get('[data-cy=pencil]').should('not.exist');
    cy.get('[data-cy=trash]').should('not.exist');
  });

  describe('when user is logged in', () => {
    let user: User;

    beforeEach(() => {
      user = {
        id: 1,
        isAdmin: false,
        email: 'test@test.com',
      };
    });

    it('when normal user is logged in, edit and delete buttons should NOT exist', () => {
      cy.mount('<li hero-card [hero]="hero" [user]="user"></li>', {
        componentProperties: {
          hero,
          user,
        },
      });
      cy.get('[data-cy=pencil]').should('not.exist');
      cy.get('[data-cy=trash]').should('not.exist');
    });
  });

  describe('when admin is logged in', () => {
    let user: User;

    beforeEach(() => {
      user = {
        id: 1,
        isAdmin: true,
        email: 'admin@test.com',
      };
    });

    it('clicking delete button should call onDeleteHero', () => {
      cy.mount(
        '<li hero-card [hero]="hero" [user]="user" (onDeleteHero)="onDeleteHero.emit($event)"></li>',
        {
          componentProperties: {
            hero,
            user,
            onDeleteHero: createOutputSpy('onDeleteHero'),
          },
        }
      );
      cy.get('[data-cy=trash]').click();
      cy.get('@onDeleteHero').should('have.been.calledWith', hero);
    });

    it('clicking edit button should call onEditHero', () => {
      cy.mount(
        '<li hero-card [hero]="hero" [user]="user" (onEditHero)="onEditHero.emit($event)"></li>',
        {
          componentProperties: {
            hero,
            user,
            onEditHero: createOutputSpy('onEditHero'),
          },
        }
      );
      cy.get('[data-cy=pencil]').click();
      cy.get('@onEditHero').should('have.been.calledWith', hero);
    });
  });
});
