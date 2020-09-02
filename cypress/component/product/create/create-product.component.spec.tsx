import { createProduct } from "../../../../modules/product/create/create-product.service";
import { apiProductUrl, IProductFilterFilter, productUrl } from "../../../../modules/product/filter/product-filter.model";
import { getFilter } from "../../../../modules/product/filter/product-filter.service";
import { Response, UploadRequest } from "../../../../modules/shared/crud/crud.model";
import { upload } from "../../../../modules/shared/crud/crud.service";
import { toUrl } from "../../../../modules/shared/helpers/string.helper";
import { defaultProduct, IProduct } from "../../../../modules/shared/models/product.model";
import { CATEGORY, COLOR, DESCRIPTION, DISCOUNTED_PRICE, DISPLAY, getOptionTag, IMAGE, IMAGE_2, NAME, PRICE, SIZE, SUBMIT, THUMBNAIL, UPLOAD_INPUT, YES } from "../../../../modules/shared/tag/tag.model";
import { randomString } from "../../../support/commands";
import { ProductDetailCardComponentBasicTest } from "../detail/product-detail-card.component.spec";
import { ICreateProductRequest } from "./create-product.model";

export default function CreateProductComponentTest() {
    describe('CreateProductComponentTest', () => {
        before(() => {
            cy.server().route({
                method: "POST",
                url: apiProductUrl.product
            }).as("route");
        })

        it('allows admin to add a new product', () => {
            const randomText = randomString(5);
            const input: IProduct = {
                ...defaultProduct,
                name: randomText,
                description: randomText,
                discountedPrice: 99.5,
                price: 100.65,
            };

            cy.getEl(NAME).type(input.name);
            cy.getEl(DESCRIPTION).type(input.description);
            cy.getEl(PRICE).type(input.price.toString());
            cy.getEl(DISCOUNTED_PRICE).type(input.discountedPrice.toString());

            cy.getEl(CATEGORY).click();
            cy.getEl(getOptionTag(CATEGORY)).first().click();

            cy.getEl(COLOR).click(name);
            cy.getEl(getOptionTag(COLOR)).first().click();
            cy.get('body').click('left');

            cy.getEl(SIZE).click(name);
            cy.getEl(getOptionTag(SIZE)).first().click();
            cy.get('body').click('left');

            cy.getEl(DISPLAY).click(name);
            cy.getEl(getOptionTag(DISPLAY)).first().click();
            cy.get('body').click('left');

            cy.getEl(THUMBNAIL).within(() => {
                cy.getEl(UPLOAD_INPUT).attachFile('test-image.jpg')
            });

            cy.getEl(IMAGE).within(() => {
                cy.getEl(UPLOAD_INPUT).attachFile('test-image.jpg')
            });

            cy.getEl(IMAGE_2).within(() => {
                cy.getEl(UPLOAD_INPUT).attachFile('test-image.jpg')
            });

            cy.getEl(SUBMIT).click();

            cy.getEl(YES).click();

            cy.wait("@route").then(data => {
                const body = data.response.body as Response<IProduct>;
                const content = body.content;
                cy.wrap(content).as('product');
                cy.load(productUrl.detail(content).as);
                ProductDetailCardComponentBasicTest();
            });
        })

    })
}

export function cyCreateProduct(input: IProduct) {

    return cy
        .fixture('test-image.jpg')
        .then(res => {
            const file = Cypress.Blob.base64StringToBlob(res, 'image/jpg');
            return [
                { name: toUrl(input.name) + '-thumbnail', file },
                { name: toUrl(input.name), file },
                { name: toUrl(input.name) + '-2', file },
            ]
        })
        .as('images')
        .then(res => upload(res))
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
        .then(res => createProduct(res))
    // .as('addedProduct')

    // .then(async string => {

    //     const file = Cypress.Blob.base64StringToBlob(string, 'image/jpg');

    //     const images: UploadRequest[] = [
    //         { name: toUrl(input.name) + '-thumbnail', file },
    //         { name: toUrl(input.name), file },
    //         { name: toUrl(input.name) + '-2', file },
    //     ];

    //     const data: ICreateProductRequest = {
    //         name: input.name.trim(),
    //         description: input.description.trim(),
    //         price: input.price,
    //         discountedPrice: input.discountedPrice,
    //         categoryId: input.category.categoryId,
    //         attributes: input.attributes.map(e => e.attributeValueId),
    //         display: input.display,
    //         thumbnail: images[0].name,
    //         image: images[1].name,
    //         image2: images[2].name,
    //     };

    //     const imgRes = await upload(images);
    //     images.forEach((entry, index) => {
    //         expect(imgRes[index].status, entry.name + ' image upload response status code:').to.eq(200);
    //     })

    //     const prodRes: Response<IProduct> = await createProduct(data);
    //     expect(prodRes.status, 'Create product api response status code').to.eq(201);
    // })
}