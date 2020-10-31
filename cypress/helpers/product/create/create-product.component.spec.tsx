import { createProduct } from "../../../../modules/product/create/create-product.service";
import { IProductFilterFilter, productUrl } from "../../../../modules/product/filter/product-filter.model";
import { getFilter } from "../../../../modules/product/filter/product-filter.service";
import { upload } from "../../../../modules/shared/crud/crud.service";
import { toUrl } from "../../../../modules/shared/helpers/string.helper";
import { IProduct } from "../../../../modules/shared/models/product.model";
import { CATEGORY, COLOR, DESCRIPTION, DISCOUNTED_PRICE, DISPLAY, tag, IMAGE, IMAGE_2, NAME, PRICE, SIZE, THUMBNAIL, UPLOAD, ITEM } from "../../../../modules/shared/tag/tag.model";
import { cySetAdminLoginToken } from "../../shared/helpers/auth.helper";
import { mockRandomProduct } from "../../shared/helpers/product.helper";
import { TEST_IMAGE } from "../../shared/image/image.component.spec";

export function cyCreateProduct(input: IProduct): Cypress.Chainable<IProduct> {

    return cy
        .pipe(cySetAdminLoginToken)
        .fixture(TEST_IMAGE)
        .then(res => Cypress.Blob.base64StringToBlob(res, 'image/jpg'))
        .then(file => [
            { name: toUrl(input.name) + '-thumbnail', file },
            { name: toUrl(input.name), file },
            { name: toUrl(input.name) + '-2', file },
        ])
        .as('images')
        .pipe(upload)
        .each((res: any) => expect(res.status, 'Image upload api response status code').to.eq(200))
        .get('@images').then((res: any) => ({
            name: input.name.trim(),
            description: input.description.trim(),
            price: input.price,
            discountedPrice: input.discountedPrice,
            categoryId: input.category.categoryId,
            attributes: input.attributes.map(e => e.attributeValueId),
            display: input.display,
            thumbnail: res[0].name,
            image: res[1].name,
            image2: res[2].name,
        }))
        .pipe(createProduct)
        .should((res) => expect(res.status, 'Create product api response status code').to.eq(201))
        .its('content')
}

export const createProductTextFields = [NAME, DESCRIPTION, PRICE, DISCOUNTED_PRICE];

export function typeCreateProductForm(input: IProduct) {

    cy.fillTextFields(createProductTextFields, input)

    cy.getEl(CATEGORY).click();
    cy.getEl(tag(ITEM, '', CATEGORY)).first().click();

    cy.getEl(COLOR).click(name);
    cy.getEl(tag(ITEM, '', COLOR)).first().click();
    cy.get('body').click('left');

    cy.getEl(SIZE).click(name);
    cy.getEl(tag(ITEM, '', SIZE)).first().click();
    cy.get('body').click('left');

    cy.getEl(DISPLAY).click(name);
    cy.getEl(tag(ITEM, '', DISPLAY)).first().click();
    cy.get('body').click('left');

    cy.getEl(THUMBNAIL).within(cyAttachImage);

    cy.getEl(IMAGE).within(cyAttachImage);

    cy.getEl(IMAGE_2).within(cyAttachImage);

}

export function cyAttachImage() {
    cy.getEl(UPLOAD).attachFile(TEST_IMAGE)
    cy.getEl(NAME).should('have.text', TEST_IMAGE)
}

export function cyCreateRandomProduct(): Cypress.Chainable {
    return cy
        .pipe(cyGetFilter)
        .pipe(res => ({
            ...mockRandomProduct(),
            category: res.categories[0],
            attributes: res.attributes
        }))
        .pipe(cyCreateProduct);
}

export function cyGetExistingProduct(): IProduct {
    const res = JSON.parse(Cypress.env('CYPRESS_EXISTING_PRODUCT'));

    return res;
}


export function cyGetFilter(): IProductFilterFilter {
    return JSON.parse(Cypress.env('CYPRESS_PRODUCT_FILTER'));
}

export function cyVisitExistingProduct() {
    return cy
        .pipe(cyGetExistingProduct)
        .pipe(productUrl.detail).its('as')
        .pipe(cy.visit);
}

export function cyVisitStubbedProduct() {
    return cy
        .fixture('product-detail.json').its('content').as('product')
        .pipe(productUrl.detail).its('as')
        .pipe(cy.visit);
}