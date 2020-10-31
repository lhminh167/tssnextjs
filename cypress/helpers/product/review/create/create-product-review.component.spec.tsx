import { createReview } from "../../../../../modules/product/review/review.service";
import { toNumber } from "../../../../../modules/shared/helpers/auth.helper";
import { IReview } from "../../../../../modules/shared/models/review.model";
import { tag, DESCRIPTION, ADD, REVIEW, RATING, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { cyGetExistingCustomer, cySetCustomerLoginToken } from "../../../shared/helpers/auth.helper";
import { getRandomString } from "../../../shared/helpers/string.helper";
import { cyGetExistingProduct } from "../../create/create-product.component.spec";
import ReviewDetailTest from "../detail/product-review.component.spec";


export function mockRandomReview(): IReview {
    const user = cyGetExistingCustomer();
    const review: IReview = {
        reviewId: 0,
        customerId: toNumber(user.customerId),
        rating: 3,
        review1: getRandomString(50),
        createdOn: new Date().toString(),
        productId: cyGetExistingProduct().productId,
        customer: user
    };
    return review;
}

export function cyClickRating(rating: number, tag: string) {
    return cy.get(`[for=${tag}-${rating}]`).should('exist').click();
}


export function cyCreateRandomReview() {
    return cy
        .pipe(cySetCustomerLoginToken).pipe(mockRandomReview)
        .pipe(createReview).its('content.reviewId')
}


export function ReviewCreateTest() {
    const randomReview = mockRandomReview();
    cy.getEl(tag(DESCRIPTION, '', ADD + REVIEW)).type(randomReview.review1);
    cy.getEl(tag(RATING, '', ADD + REVIEW)).within(() => cyClickRating(randomReview.rating, ADD + '-' + RATING));
    cy.getEl(tag(SUBMIT, '', ADD + REVIEW)).click()
    return cy;
}