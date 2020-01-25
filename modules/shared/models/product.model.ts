import { IReview } from "./review.model";
import { IAttributeValue } from "./attribute-value.model";

export const productUrl = 'products';

export interface IProduct {
    productId: number;
    name: string;
    description: string;
    price: number;
    discountedPrice: number;
    image: string;
    image2: string;
    thumbnail: string;
    display: number;
    review: IReview[];
    attributes: IAttributeValue[];
}

export const defaultProduct: IProduct = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    image: '',
    image2: '',
    thumbnail: '',
    display: 0,
    review: [],
    attributes: []
}