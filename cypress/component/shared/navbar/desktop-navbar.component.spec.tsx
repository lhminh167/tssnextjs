import { SHOPPING_CART } from "../../../../modules/shared/tag/tag.model";
import { Router } from "next/router";

export const NotLoggedInComponentTest = () => {

};

export const LoggedInComponentTest = () => {

};

export default function DesktopNavbarComponentTest() {
    describe('DesktopNavbarComponentTest', () => {

        NavbarComponentLinkTest();

    });
};

export function NavbarComponentLinkTest() {
    let returnUrl: string = null;

    before(() => {
        cy.location().its('pathname').then(url => returnUrl = url);
    })

    beforeEach(() => {
        cy.visit(returnUrl);
    })

    describe('NavbarComponentLinkTest', () => {

        it('should go to shopping cart page when shopping cart icon was clicked', () => {
            cy.getEl(SHOPPING_CART).click().getLink().load();
        });

    });


};

