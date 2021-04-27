import { tag, ITEM, SHOPPING_CART } from "../../../../modules/shared/tag/tag.model";
import { IShopingCartItem } from "../../../../modules/shopping-cart/shopping-cart.model";

export function wishlistItemShouldBeRemoved(input: IShopingCartItem) {
    cy.shouldNotExist(tag(ITEM, input.itemId, SHOPPING_CART));
    return input;
}