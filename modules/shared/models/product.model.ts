import { IReview, IReviewGetResponse } from "./review.model";
import { IAttributeValue } from "./attribute-value.model";
import { IProductFilterCategory, defaultProductFilterCategory } from "../../product/filter/product-filter.model";
import { defaultCategory } from "./category.model";
import { PaginatedList, defaultPaginationList } from "../crud/crud.model";

export const productUrl = 'product';

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
    attributes: IAttributeValue[];
    category: IProductFilterCategory;
    review: IReviewGetResponse;
    recommendation: PaginatedList<IProduct>;
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
    attributes: [],
    category: defaultProductFilterCategory,
    review: defaultPaginationList,
    recommendation: defaultPaginationList
}