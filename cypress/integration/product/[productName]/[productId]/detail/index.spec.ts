import { productUrl } from "../../../../../../modules/product/filter/product-filter.model";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { decodeAttributes, getCartItemColor, getCartItemSize } from "../../../../../../modules/shared/helpers/product.helper";
import { ADD_TO_CART, COLOR, COUNT, EDIT, REMOVE, SHOPPING_CART, SIZE, TOTAL_QUANTITY, YES } from "../../../../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl } from "../../../../../../modules/shopping-cart/shopping-cart.model";
import { cyCreateRandomProduct, cyGetExistingProduct, cyVisitExistingProduct } from "../../../../../helpers/product/create/create-product.component.spec";
import { ProductDetailTest } from "../../../../../helpers/product/detail/product-detail-card.component.spec";
import { cySetAdminLoginToken } from "../../../../../helpers/shared/helpers/auth.helper";
import { cyEditQuantity } from "../../../../../helpers/shared/quantity-picker/quantity-picker.component.spec";
import { ShoppingCartItemDetailTest } from "../../../../../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { fromProductToCartItem } from "../../../../../helpers/shopping-cart/detail/shopping-cart.component.spec";

it('Product Detail Page -> Add To Cart Button -> When Add To Cart Button is clicked, then product is added to cart #working', () => {
    const product = cyGetExistingProduct();
    let item = fromProductToCartItem(product, 3, true);
    const size = getCartItemSize(decodeAttributes(item.attributes));
    const color = getCartItemColor(decodeAttributes(item.attributes));

    cy.server().route({ url: apiShoppingCartUrl.baseUrl, method: HttpMethod.POST }).as('route')
        .pipe(cyVisitExistingProduct)
        .wrap(product).pipe(ProductDetailTest)

    cy.getEl(SIZE).get(`[data-id="${size}"]`).should('exist').click();
    cy.getEl(COLOR).get(`[data-id="${color}"]`).should('exist').click()
    cy.wrap(item.quantity).pipe(cyEditQuantity)
    cy.getEl(ADD_TO_CART).click().wait('@route');

    cy.getEl(SHOPPING_CART).click().getLink().load();
    cy
        .get('@route').its('responseBody.content.item')
        .then(res => ({ ...res, product }))
        .pipe(ShoppingCartItemDetailTest);
    cy.getEl(COUNT).should('have.text', item.quantity);
    cy.getEl(TOTAL_QUANTITY).should('have.text', item.quantity);

});

it('Product Detail Page -> Add To Cart Button -> When user adds a product with same attributes (color, size) to cart again, then quantity of that product in cart is added up #working', () => {
    const firstQuantity = 3;
    const secondQuantity = 2;
    const totalQuantity = 5;
    cy.server().route({ url: apiShoppingCartUrl.baseUrl, method: HttpMethod.POST }).as('route');
    cyVisitExistingProduct();
    cyEditQuantity(firstQuantity);
    cy.getEl(ADD_TO_CART).click().wait('@route');
    cyEditQuantity(secondQuantity);
    cy.getEl(ADD_TO_CART).click().wait('@route');
    cy.getEl(SHOPPING_CART).click().getLink().load();
    cy
        .get('@route').its('responseBody.content.item')
        .then(res => ({ ...res, product: cyGetExistingProduct(), quantity: totalQuantity }))
        .pipe(ShoppingCartItemDetailTest);
    cy.getEl(COUNT).should('have.text', totalQuantity);
    cy.getEl(TOTAL_QUANTITY).should('have.text', totalQuantity);

});


it('Product Detail Page -> Edit Product Button -> When user logs in as admin and clicks Edit Product Button, then user is redirected to Edit Product Page #working', () => {

    cy.pipe(cySetAdminLoginToken).pipe(cyVisitExistingProduct);
    cy.getEl(EDIT).click().getLink().load();
});

it('Product Detail Page -> Delete Product Button -> When user logs in as admin and clicks Delete Product Button, then product is deleted #working', () => {
    cy
        .pipe(cySetAdminLoginToken)
        .pipe(cyCreateRandomProduct)
        .pipe(productUrl.detail).its('as').as('url')
        .pipe(cy.visit)
    cy
        .getEl(REMOVE).click();
    cy
        .getEl(YES).click()
        .wrap('/').load()
        .get('@url').chain(cy.visit)
    cy.contains(404)
    cy.contains('Product not found.')
});


