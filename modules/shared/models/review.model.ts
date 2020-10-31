import { Customer, defaultCustomer } from '../../customer/customer.model';
import { Validator } from 'fluentvalidation-ts';
import { PaginationRequest, PaginatedList, defaultPaginationList } from '../crud/crud.model';
import querystring from 'query-string';
import { apiProductUrl } from '../../product/filter/product-filter.model';

export const apiReviewBaseUrl = 'review';

export const apiReviewUrl = {
    baseUrl: `${apiReviewBaseUrl}`,
    list: (input: IReviewGetRequest) => `${apiProductUrl.product}/${input.productId}/${apiReviewBaseUrl}/?${querystring.stringify(input)}`,
    detail: (reviewId: number) => `${apiReviewBaseUrl}/${reviewId}`,
}

export const reviewBaseUrl = 'review';

export const reviewUrl = {
    baseUrl: `${reviewBaseUrl}`,
    list: (input: IReviewGetRequest) => `${reviewBaseUrl}?${querystring.stringify(input)}`,
    detail: (reviewId: number) => `${reviewBaseUrl}/${reviewId}`,
}

export interface IReview {
    reviewId: number;
    customerId: number;
    productId: number;
    review1: string;
    rating: number;
    createdOn: string;
    customer: Customer;
}

export const defaultReview: IReview = {
    reviewId: 0,
    customerId: 0,
    productId: 0,
    review1: '',
    rating: 0,
    createdOn: new Date().toString(),
    customer: defaultCustomer
};

export class CreateReviewRequestValidator extends Validator<IReview> {
    constructor() {
        super();

        this.ruleFor('customerId')
            .greaterThanOrEqualTo(1);

        this.ruleFor('productId')
            .greaterThanOrEqualTo(1);

        this.ruleFor('review1')
            .notEmpty().withMessage('Review content cannot be empty.')
            .minLength(50).withMessage('Your review must be 50 characters.');

        this.ruleFor('rating')
            .greaterThan(0).lessThanOrEqualTo(5);

    }
}

export interface IReviewGetRequest extends PaginationRequest {
    productId: number;
}

export const defaultReviewGetRequest: IReviewGetRequest = {
    productId: 0,
    isPagingEnabled: true,
    isDescending: true,
    pageIndex: 0,
    pageSize: 8,
    sortBy: null
}

export interface IReviewGetResponse extends PaginatedList<IReview> {
    averageRating?: number;
}

export const defaultReviewGetResponse: IReviewGetResponse = {
    ...defaultPaginationList,
    averageRating: 1
}
