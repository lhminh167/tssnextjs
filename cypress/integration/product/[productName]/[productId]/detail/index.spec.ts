import { createCustomer } from "../../../../../../modules/customer/customer.service";
import { getProduct } from "../../../../../../modules/product/detail/product-detail.service";
import { productUrl } from "../../../../../../modules/product/filter/product-filter.model";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { decodeAttributes, getCartItemColor, getCartItemSize } from "../../../../../../modules/shared/helpers/product.helper";
import { removeLoginToken, setLoginToken } from "../../../../../../modules/shared/helpers/token.helper";
import { ADD_TO_CART, COLOR, COUNT, EDIT, RECOMMENDATION, REMOVE, SHOPPING_CART, SIZE, TOTAL_QUANTITY, YES } from "../../../../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl } from "../../../../../../modules/shopping-cart/shopping-cart.model";
import { cyCreateOrder } from "../../../../../helpers/order/create/create-order.component.spec";
import { cyCreateRandomProduct, cyGetExistingProduct, cyVisitExistingProduct } from "../../../../../helpers/product/create/create-product.component.spec";
import { ProductDetailTest } from "../../../../../helpers/product/detail/product-detail-card.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../../../helpers/shared/helpers/other.helper";
import ProductListTest from "../../../../../helpers/shared/product-list/product-list.component.spec";
import { cyEditQuantity } from "../../../../../helpers/shared/quantity-picker/quantity-picker.component.spec";
import { ShoppingCartItemDetailTest } from "../../../../../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { cyAddToCart, fromProductToCartItem } from "../../../../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Product Detail Page -> Add To Cart Button -> When Add To Cart Button is clicked, then product is added to cart #e2e-working', () => {
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

cyIt.run('Product Detail Page -> Add To Cart Button -> When user adds a product with same attributes (color, size) to cart again, then quantity of that product in cart is added up #e2e-working', () => {
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


cyIt.run('Product Detail Page -> Edit Product Button -> When user logs in as admin and clicks Edit Product Button, then user is redirected to Edit Product Page #e2e-working', () => {

    cy.pipe(cySetAdminLoginToken).pipe(cyVisitExistingProduct);
    cy.getEl(EDIT).click().getLink().load();
});

cyIt.run('Product Detail Page -> Delete Product Button -> When user logs in as admin and clicks Delete Product Button, then product is deleted #e2e-working', () => {
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

cyIt.run('Product Detail Page -> Recommendations -> When user accesses Product Detail Page, then Recommendations section shows products that were ordered together with this product within the last month #e2e-working', () => {
    const user1 = mockRandomCustomer();
    cy
        .pipe(cyCreateRandomProduct).its('productId')
        .pipe(getProduct).its('content').as('product1')

        .pipe(cyCreateRandomProduct).its('productId')
        .pipe(getProduct).its('content').as('product2')

        .chain(removeLoginToken).wrap(user1).pipe(createCustomer).its('content')
        .as('customerRes1').its('loginToken').chain(setLoginToken)

        .get('@product1').then(res => cyAddToCart(res, 1, true))
        .get('@product2').then(res => cyAddToCart(res, 1, true))

        .get('@customerRes1').its('customer')
        .then(res => ({ ...user1, customerId: res.customerId }))
        .pipe(cyCreateOrder)

        .get('@product1').pipe(productUrl.detail).its('as')
        .pipe(cy.visit)
    cy
        .getEl(RECOMMENDATION).within(() => {
            cy.get('@product2')
                .then(product2 => [product2])
                .pipe(ProductListTest)
        })
});
