import { IReview } from "../../../../../modules/shared/models/review.model";
import { tag, DESCRIPTION, REVIEW, RATING, NAME } from "../../../../../modules/shared/tag/tag.model";
import { cyGetExistingCustomer } from "../../../shared/helpers/auth.helper";

export default function ReviewDetailTest(review: IReview) {
    cy.getEl(tag(DESCRIPTION, review.reviewId, REVIEW)).should('have.text', review.review1);
    cy.getEl(tag(RATING, review.reviewId, REVIEW)).testRating(review.rating);
    cy.getEl(tag(NAME, review.reviewId, REVIEW)).should('have.text', cyGetExistingCustomer().name);
}
