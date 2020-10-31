
/// <reference types='Cypress' />
declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Query to get all HTML elements with attribute data-cy=identifier.
         * @param identifier identifier
         */
        getEl<E extends Node = HTMLElement>(
            identifier: string,
            options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
        ): Chainable<JQuery<E>>;

        /**
         * Query to test if HTML element(s) with attribute data-cy=identifier does not exist in DOM.
         * @param identifier identifier
         */
        shouldNotExist<E extends Node = HTMLElement>(
            identifier: string,
            options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
        ): Chainable<JQuery<E>>;

        /**
         * Wait until the destination page has loaded.
         * @param pathname pathname of destination page
         */
        load<E extends Node = HTMLElement>(
            pathname?: string
        ): Chainable<JQuery<E>>;

        /**
         * Get href attribute of an HTML element.
         */
        getLink<E extends Node = HTMLElement>(
        ): Chainable<JQuery<E>>;

        /**
         * Execute function of which parameter is the subject of previous command.
         */
        chain<E extends Node = HTMLElement>(
            func: any
        ): Chainable<JQuery<E>>;

        /**
         * Check the status, title, content, errors of API responses by comparing the response object and condition object.
         */
        testApi<E extends Node = HTMLElement>(
            condition: any
        ): Chainable<JQuery<E>>;

        /**
         * Fill in form.
         */
        fillTextFields<E extends Node = HTMLElement>(
            fiels: string[],
            value: object
        ): Chainable<JQuery<E>>;

        /**
         * Test texts.
         */
        testTexts<E extends Node = HTMLElement>(
            fiels: string[],
            value: object
        ): Chainable<JQuery<E>>;

        /**
         * Test text fields.
         */
        testTextFields<E extends Node = HTMLElement>(
            fiels: string[],
            value: object
        ): Chainable<JQuery<E>>;

        /**
         * Take screenshots for visual regression testing.
         */
        takeScreenShot<E extends Node = HTMLElement>(
            name?: string,
            options?: SnapshotOptions
        ): Chainable<JQuery<E>>;
    }
}