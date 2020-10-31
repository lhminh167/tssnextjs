import { createCustomer } from "../../../../../../modules/customer/customer.service";
import { apiProductUrl, productUrl } from "../../../../../../modules/product/filter/product-filter.model";
import { createReview } from "../../../../../../modules/product/review/review.service";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../../modules/shared/crud/crud.service";
import { removeLoginToken, setLoginToken } from "../../../../../../modules/shared/helpers/token.helper";
import { apiReviewBaseUrl, apiReviewUrl } from "../../../../../../modules/shared/models/review.model";
import { ADD, EDIT, tag, ITEM, LOGIN_LINK, RATING, REGISTER_LINK, REMOVE, REVIEW, SUBMIT, UNAUTHORIZED, YES, DESCRIPTION, AVERAGE_RATING, COUNT } from "../../../../../../modules/shared/tag/tag.model";
import { cyCreateRandomProduct, cyVisitExistingProduct, cyVisitStubbedProduct } from "../../../../../helpers/product/create/create-product.component.spec";
import { cyClickRating, cyCreateRandomReview, mockRandomReview, ReviewCreateTest } from "../../../../../helpers/product/review/create/create-product-review.component.spec";
import ReviewDeleteTest from "../../../../../helpers/product/review/delete/product-review-delete.component.spec";
import ReviewDetailTest from "../../../../../helpers/product/review/detail/product-review.component.spec";
import ReviewEditTest from "../../../../../helpers/product/review/edit/product-review-edit.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../../../../helpers/shared/helpers/auth.helper";
import { IReview } from "../../../../../helpers/shared/models/review.model";

it('Product Detail Page -> Review -> When user is not logged in, then Adding Review Form, Edit Review, and Delete Review buttons are hidden #e2e-working', () => {
    cyVisitExistingProduct();
    cy.getEl(UNAUTHORIZED).should('have.text', 'Please login or register to add a review.')
    cy.getEl(LOGIN_LINK).should('have.text', 'login').click().getLink().load();
    cyVisitExistingProduct();
    cy.getEl(REGISTER_LINK).should('have.text', 'register').click().getLink().load();
    cyVisitExistingProduct();
});

it('Product Detail Page -> Review -> When user logs in as customer, then user can create a new review #e2e-working', () => {
    cy
        .server()
        .route({ url: getUrl(apiReviewUrl.baseUrl), method: HttpMethod.POST }).as('addRoute')
        .route({
            url: getUrl(`${apiProductUrl.product}/**/${apiReviewBaseUrl}/?**`),
            method: HttpMethod.GET
        }).as('listRoute')
        .pipe(cySetCustomerLoginToken)
        .pipe(cyVisitExistingProduct)

        .pipe(ReviewCreateTest).wait('@addRoute').its('responseBody.content').as('review').wait('@listRoute')
        .get('@review').chain(ReviewDetailTest)
});

it('Product Detail Page -> Review -> When user logs in as customer, then user can edit or delete their own review #e2e-working', () => {
    cy
        .pipe(cyCreateRandomReview).as('reviewId')
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').chain(ReviewEditTest)
        .get('@reviewId').chain(ReviewDeleteTest)
});

it('Product Detail Page -> Review -> When user logs in as customer, then user cannot edit or delete reviews of other customers #e2e-working', () => {
    cy
        .pipe(cyCreateRandomReview).as('reviewId').chain(removeLoginToken)
        .pipe(mockRandomCustomer).pipe(createCustomer).its('content.loginToken').chain(setLoginToken)
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').then(reviewId => {
            cy.shouldNotExist(tag(EDIT, reviewId, REVIEW))
            cy.shouldNotExist(tag(REMOVE, reviewId, REVIEW))
        })
});

it('Product Detail Page -> Review -> When user logs in as admin, then user can edit or delete any review #e2e-working', () => {
    cy
        .pipe(cyCreateRandomReview).as('reviewId').chain(removeLoginToken)
        .pipe(cySetAdminLoginToken)
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').chain(ReviewEditTest)
        .get('@reviewId').chain(ReviewDeleteTest)
});

it('Product Detail Page -> Review -> When a product has multiple reviews, then product\'s average rating and number of ratings are, respectively, the average and total number of all reviews left by customers for that product #e2e-working #visual-working', () => {
    cy.pipe(cyCreateRandomProduct).as('product').its('productId').then(productId => {
        cy
            .pipe(mockRandomCustomer).pipe(createCustomer).its('content.loginToken').chain(setLoginToken)
            .wrap({ ...mockRandomReview(), productId }).pipe(createReview)

            .pipe(cySetCustomerLoginToken)
            .wrap({ ...mockRandomReview(), productId, rating: 5 })
            .pipe(createReview).its('content.reviewId').as('reviewId')
    })
    cy.get('@product').chain(productUrl.detail).its('as').pipe(cy.visit)

    cy.getEl(tag(RATING, '', AVERAGE_RATING)).testRating(4)
    cy.getEl(tag(COUNT, '', AVERAGE_RATING)).should('have.text', 2)

    cy.get('@reviewId').then(reviewId => {
        cy.getEl(tag(EDIT, reviewId, REVIEW)).click()
        cy.getEl(tag(DESCRIPTION, reviewId, EDIT + REVIEW)).get('textarea').clear()
        cy.getEl(tag(SUBMIT, reviewId, EDIT + REVIEW)).click().takeScreenShot('Product Detail Page')
    })

});
