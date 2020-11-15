import { IReview } from "../../../../../modules/shared/models/review.model";
import { ITEM, DESCRIPTION, RATING, NAME, DATETIME } from "../../../../../modules/shared/tag/tag.model";

export function ProductReviewDetailComponentBasicTest(input: IReview) {
    cy
        .getEl(ITEM)
        .find(`[data-id]=${input.reviewId}`)
        .within(() => {
            cy
                .getEl(DESCRIPTION)
                .type(input.review1).should('have.text', input.review1)
                .getEl(RATING)
                .contains(input.rating + ' Stars')
                .getEl(NAME).should('have.text', input.customer.name)
                .getEl(DATETIME).should('have.text', input.createdOn);
        })
}
