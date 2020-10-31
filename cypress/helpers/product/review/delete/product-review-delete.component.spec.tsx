import { ITEM, REMOVE, REVIEW, tag, YES } from "../../../../../modules/shared/tag/tag.model";
import { apiReviewBaseUrl, apiReviewUrl, IReview } from "../../../../../modules/shared/models/review.model";
import { getUrl } from "../../../../../modules/shared/crud/crud.service";
import { HttpMethod } from "../../../../../modules/shared/crud/crud.model";
import { apiProductUrl } from "../../../../../modules/product/filter/product-filter.model";


export default function ReviewDeleteTest(reviewId: number) {
    cy
        .server()
        .route({ url: getUrl(apiReviewUrl.detail(reviewId)), method: HttpMethod.DELETE }).as('deleteRoute')
        .route({
            url: getUrl(`${apiProductUrl.product}/**/${apiReviewBaseUrl}/?**`),
            method: HttpMethod.GET
        }).as('listRoute')

    cy.getEl(tag(REMOVE, reviewId, REVIEW)).click();
    cy.getEl(YES).click().wait('@deleteRoute').wait('@listRoute');
    cy.shouldNotExist(tag(ITEM, reviewId, REVIEW));
}

