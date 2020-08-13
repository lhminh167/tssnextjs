import { Validator } from "fluentvalidation-ts";
import { IReview } from "../../shared/models/review.model";
import { IAttributeValue } from "../../shared/models/attribute-value.model";

export interface IEditProductState {
    productId: number;
    name: string;
    description: string;
    price: string;
    discountedPrice: string;
    image: File;
    image2: File;
    thumbnail: File;
    display: string;
    size: number[];
    color: number[];
    categoryId: number;
}

export const defaultEditProductState: IEditProductState = {
    productId: 0,
    name: '',
    description: '',
    price: '0',
    discountedPrice: '0',
    image: null,
    image2: null,
    thumbnail: null,
    display: '1',
    size: [],
    color: [],
    categoryId: 0,
}

export class EditProductRequestValidator extends Validator<IEditProductRequest> {
    constructor() {
        super();

        this.ruleFor('productId')
            .greaterThan(0);

        this.ruleFor('name')
            .notEmpty();

        this.ruleFor('description')
            .notEmpty();

        this.ruleFor('price')
            .greaterThan(0);

        this.ruleFor('discountedPrice')
            .greaterThanOrEqualTo(0)
            .must((discountedPrice, model) =>
                discountedPrice < model.price
            );

        this.ruleFor('image')
            .notEmpty();

        this.ruleFor('image2')
            .notEmpty();

        this.ruleFor('thumbnail')
            .notEmpty();

        this.ruleFor('display')
            .greaterThanOrEqualTo(0);

        this.ruleFor('categoryId')
            .greaterThan(0);
    }
}


export interface IEditProductRequest {
    productId: number;
    name: string;
    description: string;
    price: number;
    discountedPrice: number;
    image: string;
    image2: string;
    thumbnail: string;
    display: number;
    attributes: number[];
    categoryId: number;
}

export const defaultEditProductRequest: IEditProductRequest = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    discountedPrice: 0,
    image: '',
    image2: '',
    thumbnail: '',
    display: 1,
    attributes: [],
    categoryId: 0,
}

export const defaultFile: File = {
    name: null,
    lastModified: null, size: null, type: null, arrayBuffer: null,
    slice: null, stream: null, text: null
}