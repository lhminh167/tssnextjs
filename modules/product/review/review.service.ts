
import { reviewBaseUrl, IReview, IReviewGetRequest } from '../../shared/models/review.model';
import { post, put, get, remove } from '../../shared/crud/crud.service';
import querystring from 'query-string';

export async function getReviews(input: IReviewGetRequest) {
    return await get(reviewBaseUrl + '?' + querystring.stringify(input));
}

export async function createReview(review: IReview) {
    return await post(reviewBaseUrl, review);
}

export async function updateReview(review: IReview) {
    return await put(reviewBaseUrl, review.reviewId, review);
}

export async function deleteReview(review: IReview) {
    return await remove(reviewBaseUrl, review.reviewId, review);
}