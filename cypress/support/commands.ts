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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { IResponse } from '../../modules/shared/crud/crud.model';
import 'cypress-file-upload';
import 'cypress-pipe';
import '@percy/cypress';
import { cySnapshotDefaultConfig } from '../helpers/shared/layout/layout.theme';
import { SUBMIT } from '../../modules/shared/tag/tag.model';
import { random } from 'cypress/types/lodash';
import { getRandomString } from '../helpers/shared/helpers/string.helper';

Cypress.Commands.add('getLink', {
    prevSubject: true
}, (subject) => {

    cy.get(subject).invoke('attr', 'href').should('exist');

})

Cypress.Commands.add(
    'getEl',
    { prevSubject: 'optional' },
    (
        subject: Cypress.Chainable,
        identifier: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
    ) => {

        return subject ?
            subject.find(`[data-cy='${identifier}']`, options) :
            cy.get(`[data-cy='${identifier}']`, options).should('exist');

    }
);

Cypress.Commands.add(
    'shouldNotExist',
    { prevSubject: 'optional' },
    (
        subject: Cypress.Chainable,
        identifier: string,
    ) => {

        return subject ?
            subject.find(`[data-cy='${identifier}']`, { timeout: 0 }).should('not.exist') :
            cy.get(`[data-cy=${identifier}]`, { timeout: 0 }).should('not.exist');;

    }
);

Cypress.Commands.add('load', {
    prevSubject: 'optional'
}, (subject, pathname) => {

    cy.url({ timeout: 60000 }).should('equal', Cypress.config().baseUrl + (subject ?? pathname));

});

Cypress.Commands.add('testApi', {
    prevSubject: 'optional'
}, (subject: any, condition: IResponse<any>) => {

    expect(subject.status, 'response status').to.eq(condition.status);
    expect(subject.title, 'response title').to.eq(condition.title);
    if (condition.errors) expect(subject.errors, 'response errors').to.be.deep.eq(condition.errors);
    if (condition.content) expect(subject.content, 'response content').not.be.undefined;
    return subject;
});

Cypress.Commands.add('chain', {
    prevSubject: 'optional'
}, (subject: any, func: Function) => {

    cy
        .log(func.name)
        .pipe(() => func(subject));
});

Cypress.Commands.add('fillTextFields', (fields: string[], value: object) => {
    if (!fields || !value) return;

    fields.forEach(field =>
        cy
            .getEl(field).find(`[name=${field}]`).clear()
            .type(value[field]).should('have.value', value[field])
    );
})

Cypress.Commands.add('clearTextFields', (fields: string[]) => {
    if (!fields) return;

    fields.forEach(field =>
        cy.getEl(field).find(`[name=${field}]`).clear()
    );

    cy.getEl(SUBMIT).click();
})

Cypress.Commands.add('testTexts', (fields: string[], value: object) => {
    if (!fields || !value) return;

    fields.forEach(field => {
        if (value[field]) cy.getEl(field).should('have.text', value[field]);
    });
})

Cypress.Commands.add('testTextFields', (fields: string[], value: object) => {
    if (!fields || !value) return;

    fields.forEach(field =>
        cy
            .getEl(field).find(`[name=${field}]`)
            .should('exist').should('have.value', value[field])
    );
})

Cypress.Commands.add('takeScreenShot', {
    prevSubject: true
}, (subject, name?: string, options: SnapshotOptions = cySnapshotDefaultConfig) => {
    // if (Cypress.env('NODE_ENV') !== 'PRODUCTION') return;

    if (!name) name = cy.state('runnable').fullTitle();
    if (!options) options = { ...cySnapshotDefaultConfig, ...options };

    cy.percySnapshot(name, options);
})

Cypress.Commands.add('testRating', {
    prevSubject: true
}, (subject, rating: number) => {
    cy.get(subject).invoke('attr', 'aria-label').should('equal', `${rating} Star${rating > 2 ? 's' : ''}`);
})