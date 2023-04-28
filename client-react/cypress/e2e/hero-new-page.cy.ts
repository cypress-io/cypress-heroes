export { };
  
describe('hero new page', () => {
  beforeEach(() => {
    //intercept the request so we can get the new hero's id to delete it later
    cy.intercept({
      method: 'POST',
      url: '**/heroes',
    }).as('request');
  });

  afterEach(() => {
    cy.get('@request').then((req: any) => {
      cy.deleteHero(req.response.body.id);
    });
  });

  describe('when admin user is logged in', () => {
    beforeEach(() => {
      cy.login('admin@test.com', 'test123');
      cy.visit(`/heroes/new`);
    });

    it('adding hero should save and display on home page', () => {
      // cy.get<Prisma.Hero>('@newHero').then((newHero) => {
      cy.get('[data-cy=nameInput]').type('New Test Hero');
      cy.get('[data-cy=priceInput]').clear().type('12');
      cy.get('[data-cy=fansInput]').clear().type('34');
      cy.get('[data-cy=savesInput]').clear().type('56');
      cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
      cy.get('button').contains('Submit').click();
      cy.location('pathname').should('equal', `/heroes`);
      cy.contains('[data-cy=hero-card]', 'New Test Hero')
        .as('heroCard')
        .should('exist');
      cy.get('@heroCard')
        .find('[data-cy=name]')
        .should('contain', 'New Test Hero');
      cy.get('@heroCard').find('[data-cy=price]').should('contain', '12');
      cy.get('@heroCard').find('[data-cy=fans]').should('contain', '34');
      cy.get('@heroCard').find('[data-cy=saves]').should('contain', '56');
      cy.get('@heroCard')
        .find('[data-cy=powers]')
        .should('contain.text', 'Fireball')
        .and('contain.text', 'Super Strength');
      // });
    });

    it('should be able to upload new avatar', () => {
      cy.get('[data-cy=nameInput]').type('New Test Hero');
      cy.get('[data-cy=priceInput]').clear().type('12');
      cy.get('[data-cy=fansInput]').clear().type('34');
      cy.get('[data-cy=savesInput]').clear().type('56');
      cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
      cy.get('[data-cy=avatarFile]').selectFile(
        './cypress/fixtures/avatar.jpg'
      );
      cy.get('button').contains('Submit').click();
      cy.location('pathname').should('equal', `/heroes`);
      cy.get('@request').then((req: any) => {
        cy.contains('[data-cy=hero-card]', 'New Test Hero')
          .as('heroCard')
          .find('img')
          .should('have.attr', 'src')
          .and('include', `heroes/${req.response.body.id}/avatar`);
      });
    });
  });
});
