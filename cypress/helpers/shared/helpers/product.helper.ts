import { defaultProduct, IProduct } from "../../../../modules/shared/models/product.model";
import { cyGetFilter } from "../../product/create/create-product.component.spec";
import { getRandomString } from "./string.helper";

export function encodeAttributes() {
}

export function decodeAttributes() {

}

export function mockRandomProduct(): IProduct {
    const filter = cyGetFilter();
    return {
        ...defaultProduct,
        name: getRandomString(5),
        description: getRandomString(5),
        discountedPrice: 99.5,
        price: 100.65,
        category: filter.categories[0],
        attributes: filter.attributes
    };
}
