import { formatCurrency } from "../../../../modules/shared/helpers/string.helper";
import { getDiscountedPrice, IProduct, isDiscounted } from "../../../../modules/shared/models/product.model";
import { DESCRIPTION, DISCOUNTED_PRICE, NAME, PRICE } from "../../../../modules/shared/tag/tag.model";
import { ColorPickerTest } from "../../shared/color-picker/color-picker.component.spec";
import { SizePickerTest } from "../../shared/size-picker/size-picker.component.spec";

export function ProductDetailTest(input: IProduct) {
    cy.getEl(NAME).should('have.text', input.name);
    cy.getEl(DESCRIPTION).should('have.text', input.description);
    cy.getEl(DISCOUNTED_PRICE).should('have.text', getDiscountedPrice(input));
    if (isDiscounted(input)) cy.getEl(PRICE).should('have.text', formatCurrency(input.price));
    SizePickerTest(input.attributes);
    ColorPickerTest(input.attributes);
    return cy;
}
