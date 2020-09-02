
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
         * Fill in register form.
         */
        typeRegister<E extends Node = HTMLElement>(
            user: any
        ): Chainable<JQuery<E>>;

        /**
         * Fill in login form.
         */
        typeLogin<E extends Node = HTMLElement>(
            user: any
        ): Chainable<JQuery<E>>;

        // /**
        //  * Return a fixed-length random string.
        //  */
        // randomString<E extends Node = HTMLElement>(
        //     length: number
        // ): Chainable<JQuery<E>>;

        /**
         * Fill in checkout form.
         */
        typeCheckout<E extends Node = HTMLElement>(
            user: any
        ): Chainable<JQuery<E>>;

        /**
         * Fill in form.
         */
        fillTextFields<E extends Node = HTMLElement>(
            fiels: string[],
            value: object
        ): Chainable<JQuery<E>>;

        /**
        * Wait until a specific iframe has loaded.
        */
        iframeLoaded<E extends Node = HTMLElement>(
        ): Chainable<JQuery<E>>;

        /**
        * get selector-satisfying element(s) within document.
        */
        getInDocument<E extends Node = HTMLElement>(
            selector: any
        ): Chainable<JQuery<E>>;

        /**
        * Get selector-satisfying element(s) within in iframe.
        */
        getWithinIframe<E extends Node = HTMLElement>(
            targetElement: any
        ): Chainable<JQuery<E>>;

        /**
        * Test page's meta data tags.
        */
        itShouldLoadMetaTags<E extends Node = HTMLElement>(
        ): Chainable<JQuery<E>>;
    }
}