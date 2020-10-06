import { defaultProductSearchRequest, productUrl, SortByEnum } from "../../modules/product/filter/product-filter.model";
import { getProducts } from "../../modules/product/filter/product-filter.service";
import { getDiscountedPrice, IProduct } from "../../modules/shared/models/product.model";
import { BEST_SELLING, DESCRIPTION, DISCOUNTED_PRICE, MOST_DISCOUNTED, NAME, NEWEST, PRODUCT_CARD, TOP_PANEL, TOP_RATED } from "../../modules/shared/tag/tag.model";
import MostDiscountedTest from "../helpers/product/most-discounted/most-discounted-product-gallery.component.spec";
import NewestTest from "../helpers/product/newest/newest-product-list.component.spec";
import TopPanelTest from "../helpers/product/top-panel/top-panel.component.spec";
import ProductListTest from "../helpers/shared/product-list/product-list.component.spec";

it('Home Page -> Top Panel -> When user accesses Home Page on Desktop, then Newest Product List should show designated products', () => {
    cy.visit('/');
    cy.getEl(TOP_PANEL).within(() => {
        cy
            .wrap({
                ...defaultProductSearchRequest,
                pageIndex: 0,
                pageSize: 8,
                display: 2,
                isDescending: true
            })
            .pipe(getProducts).its('content.items').as('items')
            .chain(TopPanelTest)
            .get('@items')
            .chain(ProductListTest)
    })
});


it('Home Page -> Most Discounted Product Gallery -> When user accesses Home Page on Desktop, then Most Discounted Product Gallery shows most discounted products', () => {
    cy.visit('/');
    cy.getEl(MOST_DISCOUNTED).within(() => {
        cy
            .pipe(MostDiscountedTest)
            .wrap({
                ...defaultProductSearchRequest,
                pageIndex: 0,
                pageSize: 4,
                sortBy: SortByEnum.MostDiscounted,
                isDescending: true
            })
            .pipe(getProducts).its('content.items')
            .chain(ProductListTest)
    })
});


it('Home Page -> Best Selling Product Gallery -> When user accesses Home Page on Desktop, then Best Selling Product Gallery shows best selling products', () => {
    cy.visit('/');
    cy.getEl(BEST_SELLING).within(() => {
        cy
            .wrap({
                ...defaultProductSearchRequest,
                pageIndex: 0,
                pageSize: 8,
                sortBy: SortByEnum.BestSelling,
                isDescending: true
            })
            .pipe(getProducts).its('content.items')
            .pipe(items => items.slice(0, 4))
            .chain(ProductListTest)
    })
});


it('Home Page -> Top Rated Product Gallery -> When user accesses Home Page on Desktop, then Top Rated Product Gallery shows top rated products', () => {
    cy.visit('/');
    cy.getEl(TOP_RATED).within(() => {
        cy
            .wrap({
                ...defaultProductSearchRequest,
                pageIndex: 0,
                pageSize: 4,
                sortBy: SortByEnum.TopRated,
                isDescending: true
            })
            .pipe(getProducts).its('content.items').as('items')
            .chain(ProductListTest)
    })
});

it('Home Page -> Newest Product List -> When user accesses Home Page on Desktop, then Newest Product List should show newest products', () => {
    cy.visit('/');
    cy.getEl(NEWEST).within(() => {
        cy
            .pipe(NewestTest)
            .wrap({
                ...defaultProductSearchRequest,
                pageIndex: 0,
                pageSize: 4,
                sortBy: SortByEnum.Newest,
                isDescending: true
            })
            .pipe(getProducts).its('content.items')
            .chain(ProductListTest)
    })

});
