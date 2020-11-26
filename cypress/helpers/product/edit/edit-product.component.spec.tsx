import { IProduct } from "../../../../modules/shared/models/product.model";
import { NAME, DESCRIPTION, ADDRESS_1, PRICE, DISCOUNTED_PRICE } from "../../../../modules/shared/tag/tag.model";
import { productUrl } from "../../../../modules/product/filter/product-filter.model";
import { cyCreateProduct } from "../create/create-product.component.spec";

export function typeEditProductForm(input: IProduct) {
    return cy
        .fillTextFields([NAME, DESCRIPTION, PRICE, DISCOUNTED_PRICE], input)
    // cy.getEl(NAME).clear().type(input.name).should('have.value', input.name);
    // cy.getEl(DESCRIPTION).clear().type(input.description).should('have.value', input.description);
    // cy.getEl(PRICE).clear().type(input.name).should('have.value', input.name);
    // cy.getEl(D).clear().type(input.name).should('have.value', input.name);
    // cy.getEl(NAME).clear().type(input.name).should('have.value', input.name);
    // cy.getEl(NAME).clear().type(input.name).should('have.value', input.name);
    // cy.getEl(NAME).clear().type(input.name).should('have.value', input.name);
}