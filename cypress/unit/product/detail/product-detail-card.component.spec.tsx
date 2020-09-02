import QuantityPickerComponentTest from "../../shared/quantity-picker/quantity-picker.component.spec";
import { ADD_TO_CART, SHOPPING_CART, COLOR, SIZE, SHOPPING_CART_ITEM, FILTERED_ITEM_COUNT, NAME } from "../../../../modules/shared/tag/tag.model";
import SizePickerComponentTest from "../../shared/size-picker/size-picker.component.spec";
import { ColorPickerComponentTest } from "../../shared/color-picker/color-picker.component.spec";
import { IProduct } from "../../shared/models/product.model";
import { defaultProduct } from "../../../../modules/shared/models/product.model";
import { IShopingCartItem, defaultShoppingCartItem } from "../../../../modules/shopping-cart/shopping-cart.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";


export default function ProductDetailCardComponentTest() {
    describe('ProductDetailCardComponentTest', () => {

        SizePickerComponentTest();
        ColorPickerComponentTest();
        QuantityPickerComponentTest();
        AddToCartButtonComponentTest();
    });
}

function AddToCartButtonComponentTest() {
    describe('AddToCartButtonComponentTest', () => {
        it('should allow user to add product to cart', () => {
            cy.getEl(NAME).invoke('text').then(name => {
                cy.getEl(SIZE).last().click().invoke('attr', 'data-size').then(size => {
                    cy.getEl(COLOR).last().click().invoke('attr', 'data-color').then(color => {

                        cy.getEl(ADD_TO_CART).click();
                        cy.getEl(SHOPPING_CART).click().getLink().load();
                        cy.getEl(SHOPPING_CART_ITEM);
                        cy.getEl(FILTERED_ITEM_COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
                        cy.getEl(NAME).invoke('text').should('eq', name);
                        cy.getEl(SIZE).invoke('text').should('eq', size);
                        cy.getEl(COLOR).invoke('text').should('eq', color);

                    });
                });
            });


        });
    });
}
