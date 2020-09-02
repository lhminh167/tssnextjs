import { IProductFilterFilter, productUrl, apiProductUrl, defaultProductFilterCategory, filterInitialData, defaultProductSearchRequest } from "../../../../modules/product/filter/product-filter.model";
import { getFilter, getProducts } from "../../../../modules/product/filter/product-filter.service";
import { Response, HttpMethod } from "../../../../modules/shared/crud/crud.model";
import { defaultProduct, IProduct } from "../../../../modules/shared/models/product.model";
import { cyCreateProduct } from "../../../component/product/create/create-product.component.spec";
import { ProductFilterMetadataComponentTest } from "../../../component/product/filter/product-filter-metadata.component.spec";
import { randomString, getRootAdminAccount } from "../../../support/commands";
import { cyLogin, cyLogout } from "../../../component/customer/login/login.component.spec";
import { SEARCH_BOX, PRODUCT_CARD, NAME, FILTERED_ITEM_COUNT, DESCRIPTION, PRODUCT_LINK, CATEGORY, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { ClickTheFirstProductCardComponent } from "../../shared/product-card/product-card.component.spec";

export default function ProductFilterComponentTest() {

    describe('ProductFilterComponentTest', () => {

        beforeEach(() => {
            cy
                .wrap(cyLogout())
                .wrap(cyLogin(getRootAdminAccount()))
                .then(getFilter).as('filter')
                .then(res => {
                    expect(res.status, 'Get filter api response status code').to.eq(200);
                    return res;
                })
                .then(res => cyCreateProduct({
                    ...defaultProduct,
                    name: randomString(5),
                    description: randomString(5),
                    discountedPrice: 99.5,
                    price: 100.65,
                    category: res.content.categories[0],
                    attributes: res.content.attributes
                })).as('added')
                .visit(productUrl.product);
        })

        it('should show products whose title containing keyword', () => {
            cy.get('@added').then(({ content: product }: any) => {
                cy.getEl(SEARCH_BOX).type(product.name + '{enter}');
                cy.getEl(FILTERED_ITEM_COUNT).should('have.text', 1);
                cy.getEl(PRODUCT_CARD).first().within(() => {
                    cy.getEl(NAME).should('have.text', product.name);
                });
            })
        });

        it('should show products whose description containing keyword', () => {
            cy.get('@added').then(({ content: product }: any) => {
                cy.getEl(SEARCH_BOX).type(product.description + '{enter}');
                cy.getEl(FILTERED_ITEM_COUNT).should('have.text', 1);
                ClickTheFirstProductCardComponent();
                cy.getEl(DESCRIPTION).should('have.text', product.description);

            })
        });

        it('should be redirected to when user, on another page, enters a search keyword', () => {

        })

        it('should show products which belongs to the chosen category', () => {
            // cy.get('@added').then(({ content: product }: any) => {
            //     cy.getEl(CATEGORY).first().click();
            //     cy.getEl(SUBMIT).click();
            //     cy.getEl(FILTERED_ITEM_COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
            //     ClickTheFirstProductCardComponent();
            //     cy.getEl(DESCRIPTION).should('have.text', product.description);

            // })
        });

        it('should show products which belongs to the chosen price range', () => {
            // cy.get('@added').then(({ content: product }: any) => {
            //     getProducts({
            //         ...defaultProductSearchRequest,
            //         category: []
            //     })
            //     cy.getEl(CATEGORY).first().click();
            //     cy.getEl(SUBMIT).click();
            //     // cy.getEl(FILTERED_ITEM_COUNT).should('have.text', 1);
            //     ClickTheFirstProductCardComponent();
            //     cy.getEl(DESCRIPTION).should('have.text', product.description);

            // })
        });


        // ProductListComponentTest();
    });
}
