import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { defaultProductSearchRequest, IProductSearchRequest, productUrl } from "../../../../modules/product/filter/product-filter.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { getColors, getSizes } from "../../../../modules/shared/helpers/product.helper";
import { COUNT, PRODUCT_CARD, SORT_BY, SORT_ORDER, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { getRandomNumber } from "../../shared/helpers/string.helper";
import { cyGetFilter } from "../create/create-product.component.spec";

export default function setupProductSortingTest(input: IProductSearchRequest) {

    // cy.server().route({ url: getUrl(apiProductUrl.search(input)) }).as('route');
    cy.visit(productUrl.product);
    cy.getEl(COUNT).click();
    cy.getEl(SORT_BY).click();
    cy.getEl(SORT_BY + input.sortBy).click();
    cy.getEl(SORT_ORDER).click();
    cy.getEl(SORT_ORDER + input.isDescending).click();
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

export function searchByPrice() {

    productUrl.search({
        ...defaultProductSearchRequest,
        minPrice: getMinPrice(),
        maxPrice: getMaxPrice(),
    })
}