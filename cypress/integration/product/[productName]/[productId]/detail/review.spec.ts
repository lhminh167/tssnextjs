import { createReview } from "../../../../../../modules/product/review/review.service";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../../modules/shared/crud/crud.service";
import { apiReviewUrl } from "../../../../../../modules/shared/models/review.model";
import { ADD, EDIT, tag, ITEM, LOGIN_LINK, RATING, REGISTER_LINK, REMOVE, REVIEW, REVIEW_1, SUBMIT, UNAUTHORIZED, YES } from "../../../../../../modules/shared/tag/tag.model";
import { cyVisitExistingProduct } from "../../../../../helpers/product/create/create-product.component.spec";
import { cyClickRating, cyCreateRandomReview, mockRandomReview } from "../../../../../helpers/product/review/create/create-product-review.component.spec";
import ReviewDeleteTest from "../../../../../helpers/product/review/delete/product-review-delete.component.spec";
import ProductReviewComponentTest from "../../../../../helpers/product/review/detail/product-review.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken } from "../../../../../helpers/shared/helpers/auth.helper";
import { IReview } from "../../../../../helpers/shared/models/review.model";

it('Product Detail Page -> Review -> When user is not logged in, Adding Review Form, Edit Review, and Delete Review buttons are hidden', () => {
    cyVisitExistingProduct();
    cy.getEl(UNAUTHORIZED).should('have.text', 'Please login or register to add a review.')
    cy.getEl(LOGIN_LINK).should('have.text', 'login').click().getLink().load();
    cyVisitExistingProduct();
    cy.getEl(REGISTER_LINK).should('have.text', 'register').click().getLink().load();
    cyVisitExistingProduct();
});

it('Product Detail Page -> Review -> When user is logged in as customer, user can create a new review', () => {
    cy
        .server()
        .route({ url: getUrl(apiReviewUrl.baseUrl), method: HttpMethod.POST }).as('addRoute')
        .route({ url: getUrl(apiReviewUrl.baseUrl + '**') }).as('listRoute')
        .pipe(cySetCustomerLoginToken)
        .pipe(cyVisitExistingProduct);

    const randomReview = mockRandomReview();
    cy.getEl(tag(REVIEW_1, '', ADD + REVIEW)).type(randomReview.review1);
    cy.getEl(tag(RATING, '', ADD + REVIEW)).within(() => cyClickRating(randomReview.rating, ADD + '-' + RATING));
    cy.getEl(tag(SUBMIT, '', ADD + REVIEW)).click();
    cy.wait('@addRoute', { timeout: 60000 }).its('responseBody.content').then(review => {
        cy.wait('@listRoute', { timeout: 60000 });
        ProductReviewComponentTest(review);
    });
});

it('Product Detail Page -> Review -> When user is logged in as customer, user can edit their own review', () => {
    cy
        .pipe(cyCreateRandomReview).its('content.reviewId').as('reviewId')
        .pipe(cyVisitExistingProduct)

        .get('@reviewId').then((reviewId: any) => {
            cy
                .server()
                .route({ url: getUrl(apiReviewUrl.detail(reviewId)), method: HttpMethod.PUT }).as('editRoute')
                .route({ url: getUrl(apiReviewUrl.baseUrl + '**') }).as('listRoute');

            const randomReview = mockRandomReview();
            cy
                .getEl(tag(EDIT, reviewId, REVIEW)).click();
            cy
                .getEl(tag(REVIEW_1, reviewId, EDIT + REVIEW))
                .type(randomReview.review1);
            cy
                .getEl(tag(RATING, reviewId, EDIT + REVIEW))
                .within(() => cyClickRating(randomReview.rating, EDIT + '-' + RATING));
            cy
                .getEl(tag(SUBMIT, reviewId, EDIT + REVIEW))
                .click();
        })
        ;

    cy.wait('@editRoute', { timeout: 60000 }).its('responseBody.content').then(review => {
        cy.wait('@listRoute', { timeout: 60000 });
        ProductReviewComponentTest(review);
    });

});

it('Product Detail Page -> Review -> When user is logged in as customer, user can delete their own review', () => {
    cy
        .pipe(cyCreateRandomReview).as('review')
        .then(ReviewDeleteTest)

});

it('Product Detail Page -> Review -> When user is logged in as customer, user cannot edit other\'s review', () => {


});

it('Product Detail Page -> Review -> When user is logged in as customer, user cannot delete other\'s review', () => {


});

it('Product Detail Page -> Review -> When user is logged in as admin, user can edit any review', () => {


});

it('Product Detail Page -> Review -> When user is logged in as admin, user can delete any review', () => {
    cy
        .pipe(cyCreateRandomReview).as('review')
        .pipe(cySetAdminLoginToken)
        .pipe(cyVisitExistingProduct)
        .get('@review')
        .chain(ReviewDeleteTest)
});
