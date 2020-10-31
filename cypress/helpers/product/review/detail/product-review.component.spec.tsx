import { IReview } from "../../../../../modules/shared/models/review.model";
import { tag, REVIEW_1, REVIEW, RATING, NAME } from "../../../../../modules/shared/tag/tag.model";
import { cyGetExistingCustomer } from "../../../shared/helpers/auth.helper";

export default function ReviewDetailTest(review: IReview) {
    cy.getEl(tag(REVIEW_1, review.reviewId, REVIEW)).should('have.text', review.review1);
    cy.getEl(tag(RATING, review.reviewId, REVIEW)).invoke('attr', 'aria-label').should('equal', `${review.rating} Star${review.rating > 2 ? 's' : ''}`);
    cy.getEl(tag(NAME, review.reviewId, REVIEW)).should('have.text', cyGetExistingCustomer().name);
}
