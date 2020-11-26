import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { defaultIsDescendingOptions, defaultProductSearchRequest, defaultSortByOptions, IProductSearchRequest, productUrl } from "../../../../modules/product/filter/product-filter.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { getColors, getSizes } from "../../../../modules/shared/helpers/product.helper";
import { COUNT, ITEM, PRODUCT_CARD, SORT_BY, SORT_ORDER, SUBMIT, tag } from "../../../../modules/shared/tag/tag.model";
import { BrandPickerTest } from "../../shared/brand-picker/brand-picker.component.spec";
import { ColorPickerTest } from "../../shared/color-picker/color-picker.component.spec";
import { getRandomNumber } from "../../shared/helpers/string.helper";
import ProductListTest from "../../shared/product-list/product-list.component.spec";
import { SizePickerTest } from "../../shared/size-picker/size-picker.component.spec";
import { cyGetFilter } from "../create/create-product.component.spec";

export default function setupProductSortingTest(input: IProductSearchRequest) {

    // cy.server().route({ url: getUrl(apiProductUrl.search(input)) }).as('route');
    cy.visit(productUrl.product).pipe(openProductFilter);
    cy.getEl(SORT_BY).click();
    cy.getEl(tag(ITEM, input.sortBy, SORT_BY)).click();
    cy.getEl(SORT_ORDER).click();
    cy.getEl(tag(ITEM, input.isDescending, SORT_ORDER)).click();
    cy.getEl(SUBMIT).click()
    cy.load(productUrl.search(input));
}

export function ProductListColorTest(color: string) {
    cy
        .getEl(PRODUCT_CARD).first().invoke('attr', 'data-id')
        .then(productId => ProductColorTest(toNumber(productId), color));
    cy
        .getEl(PRODUCT_CARD).last().invoke('attr', 'data-id')
        .then(productId => ProductColorTest(toNumber(productId), color));
}


export function ProductColorTest(productId: number, color: string) {

    cy
        .wrap(productId)
        .pipe(getProduct)
        .its('content.attributes')
        .pipe(getColors)
        .invoke('find', entry => entry.value === color)
        .its('value')
        .should('equal', color);
}


export function ProductListSizeTest(size: string) {

    cy
        .getEl(PRODUCT_CARD).first().invoke('attr', 'data-id')
        .then(productId => ProductSizeTest(toNumber(productId), size));
    cy
        .getEl(PRODUCT_CARD).last().invoke('attr', 'data-id')
        .then(productId => ProductSizeTest(toNumber(productId), size));
}


export function ProductSizeTest(productId: number, size: string) {

    cy
        .wrap(productId)
        .pipe(getProduct)
        .its('content.attributes')
        .pipe(getSizes)
        .invoke('find', entry => entry.value === size)
        .its('value')
        .should('equal', size);
}

export function ProductListCategoryTest(size: string) {

    cy
        .getEl(PRODUCT_CARD).first().invoke('attr', 'data-id')
        .then(productId => ProductCategoryTest(toNumber(productId), size));
    cy
        .getEl(PRODUCT_CARD).last().invoke('attr', 'data-id')
        .then(productId => ProductCategoryTest(toNumber(productId), size));
}

export function ProductCategoryTest(productId: number, category: string) {

    cy
        .wrap(productId)
        .pipe(getProduct)
        .its('content.category.name')
        .should('equal', category);
}

export function getMinPrice(): number {
    return getRandomPrice(true);
}

export function getMaxPrice(): number {
    return getRandomPrice(false);
}

export function getRandomPrice(isMinimum: boolean): number {
    const filter = cyGetFilter();
    const minLimit = filter.minPrice;
    const maxLimit = filter.maxPrice;
    const middlePrice = (minLimit + maxLimit) / 2;

    return isMinimum ?
        getRandomNumber(minLimit, middlePrice) :
        getRandomNumber(middlePrice, maxLimit);
}

export function openProductFilter() {

    cy.scrollTo('top')
    cy.getEl(COUNT).click({ force: true })
    return cy;
}


export function ProductFilterDetailTest() {

    cy
        .pipe(openProductFilter).pipe(cyGetFilter).as('filter')
        .get('@filter').its('attributes').chain(SizePickerTest)
        .get('@filter').its('attributes').chain(ColorPickerTest)
        .get('@filter').its('categories').chain(BrandPickerTest)
        .pipe(SortByOptionsTest)
        .pipe(SortOrderOptionsTest)

    return cy;
}


export function SortByOptionsTest() {
    cy.getEl(SORT_BY).click();
    cy.get(`[data-cy*=${tag(ITEM, '', SORT_BY)}]`).should(($els) => {
        const criteria = defaultSortByOptions.map(e => e.value);
        const elsText = $els.toArray().map(el => el.getAttribute('data-value'));
        expect(elsText).to.deep.eq(criteria);
    }).last().click()
    return cy;
}

export function SortOrderOptionsTest() {
    cy.getEl(SORT_ORDER).click();
    cy.get(`[data-cy*=${tag(ITEM, '', SORT_ORDER)}]`).should(($els) => {
        const criteria = defaultIsDescendingOptions.map(e => e.value);
        const elsText = $els.toArray().map(el => el.getAttribute('data-value') ? true : false);
        expect(elsText).to.deep.eq(criteria);
    }).last().click()
    return cy;
}

export function ProductFilterListTest() {
    return cy.wait('@route')
        .its('responseBody.pageProps.initialReduxState.productFilter.product.data').as('data')
        .its('items')
        .pipe(ProductListTest)
}