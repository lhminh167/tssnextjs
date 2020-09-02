import { formatCurrency } from "../../../../modules/shared/helpers/string.helper";
import { getDiscountedPrice, isDiscounted, IProduct } from "../../../../modules/shared/models/product.model";
import { ADD_TO_CART, COLOR, DESCRIPTION, DISCOUNTED_PRICE, FILTERED_ITEM_COUNT, NAME, PRICE, SHOPPING_CART, SHOPPING_CART_ITEM, SIZE, REMOVE, YES } from "../../../../modules/shared/tag/tag.model";
import { ColorPickerComponentBasicTest } from "../../shared/color-picker/color-picker.component.spec";
import { SizePickerComponentBasicTest } from "../../shared/size-picker/size-picker.component.spec";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { productUrl } from "../../../../modules/product/filter/product-filter.model";
import { Response } from "../../../../modules/shared/crud/crud.model";
import { cyWaitUntilDefaultOptions } from "../../../integration/pages/product/index.spec";

export default function ProductDetailCardComponentTest() {
    describe('ProductDetailCardComponentTest', () => {

        beforeEach(() => {
            cy.clearLocalStorage();
            cy.waitUntil(() => getProduct(1).then((res: Response<IProduct>) => {
                expect(res.status).to.eq(200);
                cy.wrap(res.content).as('product');
                cy.visit(productUrl.detail(res.content).as).location().its('pathname').load();
                return true;
            }), cyWaitUntilDefaultOptions);
        });

        describe('Product details', () => {
            it('should have correct values', () => {
                ProductDetailCardComponentBasicTest();
            })
        })

        describe('Add to cart button', () => {
            it('should add product to cart when clicked', () => {
                AddToCartButtonComponentTest();
            })
        })

        describe('Delete button', () => {
            it('should delete product when clicked', () => {
                DeleteProductButtonComponentTest();
            })
        })
    });
}

export function ProductDetailCardComponentBasicTest() {
    cy.get('@product').then((product: any) => {
        cy.getEl(NAME).should('have.text', product.name);
        cy.getEl(DESCRIPTION).should('have.text', product.description);
        cy.getEl(DISCOUNTED_PRICE).should('have.text', getDiscountedPrice(product));
        if (isDiscounted(product)) cy.getEl(PRICE).should('have.text', formatCurrency(product.price));
        SizePickerComponentBasicTest(product.attributes);
        ColorPickerComponentBasicTest(product.attributes);
    });
}

function AddToCartButtonComponentTest() {
    cy.getEl(NAME).invoke('text').then(name => {
        cy.getEl(SIZE).last().click().invoke('attr', 'data-size').then(size => {
            cy.getEl(COLOR).last().click().invoke('attr', 'data-color').then(color => {

                cy.getEl(ADD_TO_CART).click();
                cy.getEl(SHOPPING_CART).click().getLink().load();
                cy.getEl(SHOPPING_CART_ITEM);
                // todo cy.get('li.active').parents('.main-nav')
                cy.getEl(NAME).contains(name);
                cy.getEl(SIZE).contains(size);
                cy.getEl(COLOR).contains(color);

            });
        });
    });
}

function DeleteProductButtonComponentTest() {
    cy.getEl(REMOVE).click();
    cy.getEl(YES).click();
    cy.load('/');
}
