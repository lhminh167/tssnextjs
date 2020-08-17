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
    cy.getEl('email')
        .type(user.email)

    cy.getEl('password')
        .type(user.password)
})


Cypress.Commands.add('typeRegister', (user) => {
    cy.getEl('name')
        .type(user.password)

    cy.getEl('email')
        .type(user.email)

    cy.getEl('password')
        .type(user.password)
})


// Cypress.Commands.add('randomString', (subject, length: number) => {

//     Math.random().toString(36).substring(length);
// })


Cypress.Commands.add('typeCheckout', (user) => {

    const fields: string[] = [
        'address1',
        'address2',
        'city',
        'region',
        'postalCode',
        'country',
        'mobPhone',
        'dayPhone',
        'evePhone',
    ];

    cy.fillTextFields(fields, user);

    cy.getEl('shippingId').click()
    cy.getEl('shippingId' + user.shippingId).click();
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
    (targetElement) => cy.get('iframe')
        .first()
        .iframeLoaded()
        .its('document').should('exist')
        .getInDocument(targetElement)
);