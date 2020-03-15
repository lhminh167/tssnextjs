import { createStyles, makeStyles } from "@material-ui/core";
import { Fragment } from "react";
import ProductDetailCardComponent from "../../../modules/product/detail/product-detail-card.component";
import { getProduct, getProductRecommendation } from "../../../modules/product/detail/product-detail.service";
import ProductReviewListComponent from "../../../modules/product/review/list/product-review-list.component";
import { getReviews } from "../../../modules/product/review/review.service";
import { IProduct } from "../../../modules/shared/models/product.model";
import { defaultReviewGetRequest, IReview, IReviewGetRequest } from "../../../modules/shared/models/review.model";
import querystring from 'query-string';
import { PaginatedList } from "../../../modules/shared/crud/crud.model";

const useStyles = makeStyles(() =>
    createStyles({
    }),
);

function ProductDetailPage(data: IProduct) {
    const classes = useStyles({});

    return (
        <Fragment
        >
            <ProductDetailCardComponent
                data={data}
            />
            <ProductReviewListComponent
                data={data}
            />
        </Fragment>
    );
}

ProductDetailPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query,
        req
    },
    ctx
}) {
    const productResponse: any = await getProduct(query.productId);
    // const reviewResponse: any = await getReviews({
    //     ...defaultReviewGetRequest,
    //     ...query as IReviewGetRequest
    // });

    // const recommendtionResponse = await getProductRecommendation(query.productId);
    debugger
    return {
        ...productResponse.content,
        // review: reviewResponse.content
    };
}

export default ProductDetailPage;
