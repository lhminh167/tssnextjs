import { IReview } from "../../../../../modules/shared/models/review.model";
import { ITEM, REVIEW_1, RATING, NAME, CREATED_ON } from "../../../../../modules/shared/tag/tag.model";

export default function ProductReviewDetailComponentTest() {
    describe('ProductReviewDetailComponentTest', () => {
        describe('', () => {
            it('', () => {

            });
        });
    });
}

export function ProductReviewDetailComponentBasicTest(input: IReview) {
    cy
        .getEl(ITEM)
        .find(`[data-id]=${input.reviewId}`)
        .within(() => {
            cy
                .getEl(REVIEW_1)
                .type(input.review1).should('have.text', input.review1)
                .getEl(RATING)
                .contains(input.rating + ' Stars')
                .getEl(NAME).should('have.text', input.customer.name)
                .getEl(CREATED_ON).should('have.text', input.createdOn);
        })
}
