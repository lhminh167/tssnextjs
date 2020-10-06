import { Customer } from "../../../../modules/customer/customer.model";
import { ADDRESS_1, ADDRESS_2, CITY, COUNTRY, DAY_PHONE, EVE_PHONE, MOB_PHONE, NAME, POSTALCODE, REGION, SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";

export function typeCustomerEditForm(input: Customer) {

    const fields: string[] = [
        NAME,
        ADDRESS_1,
        ADDRESS_2,
        CITY,
        REGION,
        POSTALCODE,
        COUNTRY,
        DAY_PHONE,
        EVE_PHONE,
        MOB_PHONE,
    ];

    cy.fillTextFields(fields, input);

    cy.getEl(SHIPPING_REGION).click();
    cy.getEl(SHIPPING_REGION + input.shippingRegion.shippingRegionId).click();
}

