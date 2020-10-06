import { CITY, COUNTRY, DAY_PHONE, EMAIL, EVE_PHONE, MOB_PHONE, NAME, REGION, ROLE, SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";

export default function CustomerDetailTest(user) {
    const fields = [NAME, EMAIL, COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, ROLE, CITY];
    cy.testTextFields(fields, user).then(() => {
        if (user.shippingRegion.shippingRegion1) cy.getEl(SHIPPING_REGION).should('have.text', user.shippingRegion.shippingRegion1);
    })

}