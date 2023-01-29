import { Component } from '@angular/core';
import { createOutputSpy } from 'cypress/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should mount with text', () => {
    cy.mount(`<app-button>Click me</app-button>`, {
      declarations: [ButtonComponent],
    });
    cy.get('button').should('have.text', 'Click me');
  });

  it('should not be focused when focus is falsey', () => {
    cy.mount(`<app-button>Click me</app-button>`, {
      declarations: [ButtonComponent],
    });
    cy.focused().should('not.exist');
  });

  it('should be focused when focus input is true', () => {
    cy.mount(`<app-button [focus]="true">Click me</app-button>`, {
      declarations: [ButtonComponent],
    });
    cy.get('button').should('have.focus');
  });

  it('should respond to onClick event', () => {
    cy.mount(`<app-button [focus]="true" (onClick)="onClick.emit($event)">Click me</app-button>`, {
      componentProperties: {
        onClick: createOutputSpy('onClickSpy')
      },
    });
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });

  it('should respond to onClick event', () => {
    cy.mount(
      '<app-button (click)="onClick.emit($event)">Click me</app-button>',
      {
        declarations: [ButtonComponent],
        componentProperties: {
          onClick: {
            emit: cy.spy().as('onClickSpy'),
          },
        },
      }
    );
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });

  it('should respond to onClick event', () => {
    cy.mount(
      '<app-button (click)="onClick.emit($event)">Click me</app-button>',
      {
        componentProperties: {
          onClick: createOutputSpy('onClickSpy'),
        },
      }
    );
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
