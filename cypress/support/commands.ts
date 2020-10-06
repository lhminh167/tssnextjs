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

import 'cypress-file-upload';
import 'cypress-pipe';
import 'cypress-wait-until';
import { Response } from '../../modules/shared/crud/crud.model';
import 'cypress-iframe';

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
}, (subject: any, condition: Response<any>) => {

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

Cypress.Commands.add('testTextFields', (fields: string[], value: object) => {
    if (!fields || !value) return;

    fields.forEach(field => {
        if (value[field]) cy.getEl(field).should('have.text', value[field]);
    });
})

Cypress.Commands.add(
    'iframeLoaded',
    { prevSubject: 'element' },
    //@ts-ignore
    ($iframe) => {
        const contentWindow = $iframe.prop('contentWindow');
        return new Promise(resolve => {
            if (
                contentWindow &&
                contentWindow.document.readyState === 'complete'
            ) {
                resolve(contentWindow)
            } else {
                $iframe.on('load', () => {
                    resolve(contentWindow)
                })
            }
        })
    });


Cypress.Commands.add(
    'getInDocument',
    { prevSubject: 'document' },
    //@ts-ignore
    (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
    'getWithinIframe',
    (targetElement) => cy.get('iframe', { timeout: 600000 }).should('exist')
        .first().should('exist')
        .iframeLoaded().should('exist')
        .its('document').should('exist')
        .getInDocument(targetElement).should('exist')
);

let appHasStarted: boolean = false;

function spyOnAddEventListener(win) {
    // win = window object in our application
    const addListener = win.EventTarget.prototype.addEventListener
    win.EventTarget.prototype.addEventListener = function (name) {
        if (name === 'change') {
            // web app added an event listener to the input box -
            // that means the web application has started
            appHasStarted = true
            // restore the original event listener
            win.EventTarget.prototype.addEventListener = addListener
        }
        return addListener.apply(this, arguments)
    }
}

Cypress.Commands.add(
    'open',
    (
        url: string,
        options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
    ) => {
        cy.visit(url, { ...options, onBeforeLoad: spyOnAddEventListener })
    }
)