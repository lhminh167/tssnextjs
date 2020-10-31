import { ITEM, REMOVE, REVIEW, tag, YES } from "../../../../../modules/shared/tag/tag.model";
import { apiReviewUrl, IReview } from "../../../../../modules/shared/models/review.model";
import { getUrl } from "../../../../../modules/shared/crud/crud.service";
import { HttpMethod } from "../../../../../modules/shared/crud/crud.model";


export default function ReviewDeleteTest(reviewId: number) {
    cy.server();
    cy.route({ url: getUrl(apiReviewUrl.detail(reviewId)), method: HttpMethod.DELETE }).as('deleteRoute');
    cy.route({ url: getUrl(apiReviewUrl.baseUrl + '**') }).as('listRoute');

    cy.getEl(tag(REMOVE, reviewId, REVIEW)).click();
    cy.getEl(YES).click().wait('@deleteRoute').wait('@listRoute');
    cy.shouldNotExist(tag(ITEM, reviewId, REVIEW));
}

