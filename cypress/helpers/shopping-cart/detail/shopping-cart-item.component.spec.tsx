import { decodeAttributes, getCartItemColor, getCartItemSize } from "../../../../modules/shared/helpers/product.helper";
import { getDiscountedPrice } from "../../../../modules/shared/models/product.model";
import { QUANTITY, COLOR, DISCOUNTED_PRICE, tag, ITEM, NAME, SHOPPING_CART, SIZE } from "../../../../modules/shared/tag/tag.model";
import { IShopingCartItem } from "../../../../modules/shopping-cart/shopping-cart.model";

export function ShoppingCartItemDetailTest(input: IShopingCartItem) {
    cy.getEl(tag(ITEM, input.itemId, SHOPPING_CART)).within(() => {

        cy.getEl(NAME).should('have.text', input.product.name);
        cy.getEl(SIZE).should('have.text', getCartItemSize(decodeAttributes(input.attributes)));
        cy.getEl(COLOR).should('have.text', getCartItemColor(decodeAttributes(input.attributes)));
        cy.getEl(DISCOUNTED_PRICE).should('have.text',
            getDiscountedPrice(input.product)
        );
        cy.getEl(QUANTITY).should('have.value', input.quantity);
    })
    return cy;
}
