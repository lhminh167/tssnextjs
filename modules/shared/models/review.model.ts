import { Customer } from "../../customer/customer.model";
import { Validator } from "fluentvalidation-ts";
import { PaginationRequest, PaginatedList, defaultPaginationList } from "../crud/crud.model";

export const reviewBaseUrl = 'review';

export interface IReview {
    reviewId?: number;
    customerId?: number;
    productId?: number;
    review1?: string;
    rating?: number;
    createdOn?: string;
    customer?: Customer;
}


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
