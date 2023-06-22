// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

import '../../src/styles.scss';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import CyHerosProvider from '../../src/components/CyHeroesProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouteObject, RouterProvider, createMemoryRouter } from 'react-router';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithProviders: typeof mountWithProviders;
    }
  }
}

Cypress.Commands.add('mount', mount);
Cypress.Commands.add('mountWithProviders', mountWithProviders);

function mountWithProviders(
  jsx: React.ReactNode,
  routePath: string,
  initialPath: string
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  let routes: RouteObject[] = [
    {
      path: routePath,
      element: jsx,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [initialPath],
  });
  cy.stub(router, 'navigate').as('navigateSpy');

  const wrapped = (
    <CyHerosProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CyHerosProvider>
  );
  cy.mount(wrapped);
}

// Example use:
// cy.mount(<MyComponent />)
