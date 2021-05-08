import { defaultPaginationRequest, PaginatedList, IResponse } from "../../../../modules/shared/crud/crud.model";
import { encodeAttributes } from "../../../../modules/shared/helpers/product.helper";
import { getLoginToken, setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { IProduct } from "../../../../modules/shared/models/product.model";
import { tag, ITEM, SHOPPING_CART, SUBMIT, TOTAL_QUANTITY } from "../../../../modules/shared/tag/tag.model";
import { IShopingCartItem } from "../../../../modules/shopping-cart/shopping-cart.model";
import { addShoppingCartItem, getShoppingCart, removeShoppingCartItem } from "../../../../modules/shopping-cart/shopping-cart.service";
import { cySetCustomerLoginToken } from "../../shared/helpers/auth.helper";

export async function cyRemoveAllCartItems(buyNow: boolean) {

    const cart: IResponse<PaginatedList<IShopingCartItem>> = await getShoppingCart({
        ...defaultPaginationRequest,
        buyNow
    });

    for (const item of cart.content.items) {
        const res: IResponse<IShopingCartItem> = await removeShoppingCartItem(item);
        expect(res.status, 'Response status code for removing shopping cart item ID ' + item.itemId).to.eq(200);
    };

    cy.log('Removed all cart items successfully.');

    return cart;
}

export async function cyAddToCart(
    input: IProduct,
    quantity: number,
    buyNow: boolean
) {
    const item = fromProductToCartItem(input, quantity, buyNow);
    const response = await addShoppingCartItem(item);
    response.content.item.product = input;
    return response;
}

export function fromProductToCartItem(
    input: IProduct,
    quantity: number,
    buyNow: boolean
): IShopingCartItem {
    const colors = input.attributes.filter(e => e.name === 'Color');
    const sizes = input.attributes.filter(e => e.name === 'Size');

    const item: IShopingCartItem = {
        productId: input.productId,
        quantity,
        attributes: encodeAttributes([
            colors[colors.length - 1],
            sizes[sizes.length - 1]
        ]),
        buyNow,
        price: input.price,
        discountedPrice: input.discountedPrice,
        name: input.name,
        image: input.thumbnail,
        product: input,
    }

    return item;
}

export function cartItemShouldBeRemoved(input: IShopingCartItem) {
    cy.shouldNotExist(tag(ITEM, input.itemId, SHOPPING_CART));
    cy.getEl(TOTAL_QUANTITY).should('have.text', '0');
    return input;
}

export function finishShoppingCartPage() {
    cy.pipe(cyGetAnyCartItem).should('exist');
    cy.getEl(SUBMIT).click();
    return cy;
}

export function cyGetAnyCartItem() {
    return cy.get(`[data-cy*="${ITEM}"]`);
}
