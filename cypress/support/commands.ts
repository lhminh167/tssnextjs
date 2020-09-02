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

import { PASSWORD, EMAIL, NAME, ADDRESS_1, ADDRESS_2, MOB_PHONE, DAY_PHONE, EVE_PHONE, COUNTRY, POSTALCODE, REGION, CITY, SHIPPING, SUBMIT } from "../../modules/shared/tag/tag.model";
import { ILoginRequest, customerUrl } from "../../modules/customer/customer.model";
import 'cypress-file-upload';
import 'cypress-wait-until';

Cypress.Commands.add('getLink', {
    prevSubject: true
}, (subject) => {

    cy.get(subject).invoke('attr', 'href');

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
            cy.get(`[data-cy='${identifier}']`, options);

    }
);

Cypress.Commands.add('load', {
    prevSubject: 'optional'
}, (subject, pathname) => {

    cy.url({ timeout: 60000 }).should('equal', Cypress.config().baseUrl + (subject ?? pathname));

});

Cypress.Commands.add('typeLogin', (user) => {
    cy.getEl(EMAIL)
        .type(user.email)

    cy.getEl(PASSWORD)
        .type(user.password)
})


Cypress.Commands.add('typeRegister', (user) => {
    cy.getEl(NAME)
        .type(user.password)

    cy.getEl(EMAIL)
        .type(user.email)

    cy.getEl(PASSWORD)
        .type(user.password)
})

Cypress.Commands.add('typeCheckout', (user) => {

    const fields: string[] = [
        ADDRESS_1,
        ADDRESS_2,
        CITY,
        REGION,
        POSTALCODE,
        COUNTRY,
        MOB_PHONE,
        DAY_PHONE,
        EVE_PHONE,
    ];

    cy.fillTextFields(fields, user);

    cy.getEl(SHIPPING).click()
    cy.getEl(SHIPPING + user.shippingId).click();
});


Cypress.Commands.add('fillTextFields', (fields: string[], value: object) => {
    if (!fields || !value) return;

    fields.forEach(field =>
        cy.getEl(field).type(value[field])
    );
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
    (targetElement) => cy.get('iframe', { timeout: 600000 })
        .first()
        .iframeLoaded()
        .its('document').should('exist')
        .getInDocument(targetElement)
);


export function randomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.toLowerCase();
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getRootAdminAccount() {
    const account: ILoginRequest = {
        email: 'lhminh.phs@gmail.com',
        password: 'string'
    }

    return account;
}

