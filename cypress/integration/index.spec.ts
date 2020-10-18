import { defaultProductSearchRequest, SortByEnum } from "../../modules/product/filter/product-filter.model";
import { getHomepageProducts, getProducts } from "../../modules/product/filter/product-filter.service";
import { IProduct } from "../../modules/shared/models/product.model";
import { BEST_SELLING, CAROUSEL, DOT, MOST_DISCOUNTED, NEWEST, PRODUCT_CARD, PRODUCT_LINK, TOP_PANEL, TOP_RATED } from "../../modules/shared/tag/tag.model";
import MostDiscountedTest from "../helpers/product/most-discounted/most-discounted-product-gallery.component.spec";
import NewestTest from "../helpers/product/newest/newest-product-list.component.spec";
import { getLastEl, getRandomDomEl } from "../helpers/shared/helpers/other.helper";
import ProductCardDetailTest from "../helpers/shared/product-card/product-card.component.spec";
import ProductListTest from "../helpers/shared/product-list/product-list.component.spec";

it('Home Page -> Top Panel -> Carousel Dot -> When user clicks a carousel dot, then the corresponding Top Panel Carousel Card is shown #working', () => {
    cy.visit('/').pipe(getHomepageProducts).its('content.topPanel.items').as('topPanel')
    cy.getEl(TOP_PANEL + CAROUSEL).within(() => {
        cy.getEl(DOT).last().click().clock(Date.now())
        cy.get('@topPanel').chain(getLastEl).chain(ProductCardDetailTest)
        cy.getEl(PRODUCT_LINK).click().getLink().load()
    })
});

it('Home Page -> Top Panel -> Product Cards -> When user accesses Home Page on Desktop, then Top Panel Product Cards show five Top Panel Products #working', () => {
    cy.visit('/').pipe(getHomepageProducts).its('content.topPanel.items').as('topPanel')
    cy.getEl(TOP_PANEL + PRODUCT_CARD).within(() => {
        cy
            .get('@topPanel')
            .then(products => products.slice(0, 5))
            .then((products: any) => products.forEach(product => {
                ProductCardDetailTest(product)
                cy.wrap(product).its('display').should('equal', 2);
            }));
        cy
            .getEl(PRODUCT_LINK).pipe(getRandomDomEl).click().getLink().load().go('back');
    })
});

it('Home Page -> Most Discounted Product Gallery -> When user accesses Home Page on Desktop, then Most Discounted Product Gallery shows most discounted products #working', () => {
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


it('Home Page -> Best Selling Product Gallery -> When user accesses Home Page on Desktop, then Best Selling Product Gallery shows best selling products #working', () => {
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


it('Home Page -> Top Rated Product Gallery -> When user accesses Home Page on Desktop, then Top Rated Product Gallery shows top rated products #working', () => {
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

it('Home Page -> Newest Product List -> When user accesses Home Page on Desktop, then Newest Product List should show newest products #working', () => {
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
