import { apiProductUrl } from "../../../../../modules/product/filter/product-filter.model";
import { HttpMethod } from "../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../modules/shared/crud/crud.service";
import { apiReviewBaseUrl, apiReviewUrl } from "../../../../../modules/shared/models/review.model";
import { EDIT, RATING, REVIEW, DESCRIPTION, SUBMIT, tag } from "../../../../../modules/shared/tag/tag.model";
import { cyClickRating, mockRandomReview } from "../create/create-product-review.component.spec";
import ReviewDetailTest from "../detail/product-review.component.spec";

export default function ReviewEditTest(reviewId: number) {
    cy
        .server()
        .route({ url: getUrl(apiReviewUrl.detail(reviewId)), method: HttpMethod.PUT }).as('editRoute')
        .route({
            url: getUrl(`${apiProductUrl.product}/**/${apiReviewBaseUrl}/?**`),
            method: HttpMethod.GET
        }).as('listRoute')

    const randomReview = mockRandomReview();
    cy
        .getEl(tag(EDIT, reviewId, REVIEW)).click();
    cy
        .getEl(tag(DESCRIPTION, reviewId, EDIT + REVIEW))
        .type(randomReview.review1);
    cy
        .getEl(tag(RATING, reviewId, EDIT + REVIEW))
        .within(() => cyClickRating(randomReview.rating, EDIT + '-' + RATING));
    cy
        .getEl(tag(SUBMIT, reviewId, EDIT + REVIEW)).click()
        .wait('@editRoute').its('responseBody.content').as('review').wait('@listRoute')
        .get('@review').chain(ReviewDetailTest);
}
