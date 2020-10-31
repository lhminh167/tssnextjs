import { Customer } from "../../../../modules/customer/customer.model";
import { ADDRESS_1, ADDRESS_2, CITY, COUNTRY, DAY_PHONE, EMAIL, EVE_PHONE, MOB_PHONE, NAME, POSTALCODE, REGION, ROLE, SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";

export const userDetailTexts = [NAME, EMAIL, ADDRESS_1, ADDRESS_2, COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, CITY, POSTALCODE];

export default function UserDetailTest(user: Customer) {
    cy.testTexts(userDetailTexts, user);
    cy.getEl(SHIPPING_REGION).should('have.text', user.shippingRegion.shippingRegion1);
    cy.getEl(ROLE).should('have.text', user.role);
}