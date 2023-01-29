import { defineConfig } from "cypress";
import { createHero, deleteHero } from 'cypress/support/data';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },

  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('task', {
        createHero,
        deleteHero,
      });
    },
  },
});
