import { HttpMethod } from '../../modules/shared/crud/crud.model';
import { getUrl } from '../../modules/shared/crud/crud.service';
import { MINUS_ONE_QUANTITY, NEXT, PLUS_ONE_QUANTITY, PREVIOUS, QUANTITY, UPDATE_QUANTITY } from '../../modules/shared/tag/tag.model';
import ShoppingCartQuantityPickerComponent from '../../modules/shopping-cart/quantity-picker/shopping-cart-quantity-picker.component';
import { apiShoppingCartUrl } from '../../modules/shopping-cart/shopping-cart.model';
import { cyGetExistingProduct } from '../helpers/product/create/create-product.component.spec';
import { cyIt } from '../helpers/shared/helpers/other.helper';
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';
import { cyEditQuantity } from '../helpers/shared/quantity-picker/quantity-picker.component.spec';
import { fromProductToCartItem } from '../helpers/shopping-cart/detail/shopping-cart.component.spec';

cyIt.run('Shopping Cart Quantity Picker Component -> When user click a navigation button, then gallery shows the corresponding slide. When there is no corresponding slide, then the corresponding navigation button is disabled #priority-3-working #unit-working', () => {
    cy
        .pipe(cyGetExistingProduct).then(res => fromProductToCartItem(res, 1, true))
        .then<CyMountProps>(res => ({
            Component: ShoppingCartQuantityPickerComponent,
            props: { data: res }
        }))
        .pipe(cyMount)

    cy.getEl(QUANTITY).should('have.value', 1);

    cy.getEl(MINUS_ONE_QUANTITY).click()
    cy.getEl(QUANTITY).should('have.value', 1);

    cy.getEl(PLUS_ONE_QUANTITY).click();
    cy.getEl(QUANTITY).should('have.value', 2);

    cy.getEl(MINUS_ONE_QUANTITY).click();
    cy.getEl(QUANTITY).should('have.value', 1);

    cy.wrap(11).pipe(cyEditQuantity)
    cy.getEl(QUANTITY).should('have.value', 11);

    cy.server().route({ url: getUrl(apiShoppingCartUrl.baseUrl + '**'), method: HttpMethod.PUT }).as('route')
    cy.getEl(UPDATE_QUANTITY).click().wait('@route');
})
