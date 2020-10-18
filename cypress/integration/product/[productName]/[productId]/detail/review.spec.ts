import { createCustomer } from "../../../../../../modules/customer/customer.service";
import { createReview } from "../../../../../../modules/product/review/review.service";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../../modules/shared/crud/crud.service";
import { removeLoginToken, setLoginToken } from "../../../../../../modules/shared/helpers/token.helper";
import { apiReviewUrl } from "../../../../../../modules/shared/models/review.model";
import { ADD, EDIT, tag, ITEM, LOGIN_LINK, RATING, REGISTER_LINK, REMOVE, REVIEW, REVIEW_1, SUBMIT, UNAUTHORIZED, YES, DESCRIPTION } from "../../../../../../modules/shared/tag/tag.model";
import { cyVisitExistingProduct } from "../../../../../helpers/product/create/create-product.component.spec";
import { cyClickRating, cyCreateRandomReview, mockRandomReview, ReviewCreateTest } from "../../../../../helpers/product/review/create/create-product-review.component.spec";
import ReviewDeleteTest from "../../../../../helpers/product/review/delete/product-review-delete.component.spec";
import ReviewDetailTest from "../../../../../helpers/product/review/detail/product-review.component.spec";
import ReviewEditTest from "../../../../../helpers/product/review/edit/product-review-edit.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../../../../helpers/shared/helpers/auth.helper";
import { IReview } from "../../../../../helpers/shared/models/review.model";

it('Product Detail Page -> Review -> When user is not logged in, then Adding Review Form, Edit Review, and Delete Review buttons are hidden #working', () => {
    cyVisitExistingProduct();
    cy.getEl(UNAUTHORIZED).should('have.text', 'Please login or register to add a review.')
    cy.getEl(LOGIN_LINK).should('have.text', 'login').click().getLink().load();
    cyVisitExistingProduct();
    cy.getEl(REGISTER_LINK).should('have.text', 'register').click().getLink().load();
    cyVisitExistingProduct();
});

it('Product Detail Page -> Review -> When user logs in as customer, then user can create a new review #working', () => {
    cy
        .server()
        .route({ url: getUrl(apiReviewUrl.baseUrl), method: HttpMethod.POST }).as('addRoute')
        .route({ url: getUrl(apiReviewUrl.baseUrl + '**') }).as('listRoute')
        .pipe(cySetCustomerLoginToken)
        .pipe(cyVisitExistingProduct)
    cy
        .getEl(tag(REVIEW_1, '', ADD + REVIEW)).takeScreenShot()
        .pipe(ReviewCreateTest)
        .wait('@addRoute').its('responseBody.content').as('review').wait('@listRoute')
        .get('@review').chain(ReviewDetailTest)
});

it('Product Detail Page -> Review -> When user logs in as customer, then user can edit or delete their own review #working', () => {
    cy
        .pipe(cyCreateRandomReview)
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').chain(ReviewEditTest)
        .get('@reviewId').chain(ReviewDeleteTest)
});

it('Product Detail Page -> Review -> When user logs in as customer, then user cannot edit or delete reviews of other customers #working', () => {
    cy
        .pipe(cyCreateRandomReview).chain(removeLoginToken)
        .pipe(mockRandomCustomer).pipe(createCustomer).its('content.loginToken').chain(setLoginToken)
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').then(reviewId => {
            cy.shouldNotExist(tag(EDIT, reviewId, REVIEW))
            cy.shouldNotExist(tag(REMOVE, reviewId, REVIEW))
        })
});

it('Product Detail Page -> Review -> When user logs in as admin, then user can edit or delete any review #working', () => {
    cy
        .pipe(cyCreateRandomReview).chain(removeLoginToken)
        .pipe(cySetAdminLoginToken)
        .pipe(cyVisitExistingProduct)
        .get('@reviewId').chain(ReviewEditTest)
        .get('@reviewId').chain(ReviewDeleteTest)
});
