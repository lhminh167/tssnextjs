import { Customer } from "../../customer/customer.model";
import { Validator } from "fluentvalidation-ts";

const reviewBaseUrl = 'review';

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
            .notEmpty();

        this.ruleFor('rating')
            .greaterThanOrEqualTo(0).lessThanOrEqualTo(5);

    }
}

