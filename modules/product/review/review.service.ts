
import { apiReviewUrl, IReview, IReviewGetRequest } from '../../shared/models/review.model';
import { post, put, get, remove } from '../../shared/crud/crud.service';

export async function getReviews(input: IReviewGetRequest) {
    return await get(apiReviewUrl.list(input));
}

export async function createReview(review: IReview) {
    return await post(apiReviewUrl.baseUrl, review);
}

export async function updateReview(review: IReview) {
    return await put(apiReviewUrl.baseUrl, review.reviewId, review);
}

export async function deleteReview(review: IReview) {
    return await remove(apiReviewUrl.baseUrl, review.reviewId, review);
}