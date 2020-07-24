import { Container, createStyles, makeStyles, Paper } from "@material-ui/core";
import ProductDetailCardComponent from "../../../modules/product/detail/product-detail-card.component";
import { ProductDetailMetadataComponent } from "../../../modules/product/detail/product-detail-metadata.component";
import { getProduct } from "../../../modules/product/detail/product-detail.service";
import ProductRecommendationComponent from "../../../modules/product/recommendation/product-recommendation.component";
import ProductReviewListComponent from "../../../modules/product/review/list/product-review-list.component";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import { mb, mt } from "../../../modules/shared/layout/layout.style";
import { IProduct } from "../../../modules/shared/models/product.model";

const useStyles = makeStyles(() => createStyles({
    mb: mb,
    mt: mt
}));

function ProductDetailPage(data: IProduct) {
    const classes = useStyles({});
    return (
        <Container
            className={classes.mb + ' ' + classes.mt}
        >
            <Paper>
                <ErrorBoundary>
                    <ProductDetailCardComponent data={data} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ProductReviewListComponent data={data} />
                </ErrorBoundary>
            </Paper>
            <ErrorBoundary>
                {data.recommendation.count > 0 && (
                    <ProductRecommendationComponent data={data} />
                )}
            </ErrorBoundary>
            <ErrorBoundary>
                <ProductDetailMetadataComponent
                    data={data}
                />
            </ErrorBoundary>
        </Container>
    );
}

ProductDetailPage.getInitialProps = async function ({
    ctx: { isServer, store, query, req },
    ctx
}) {
    const productResponse: any = await getProduct(query.productId);
    return {
        ...productResponse.content
    };
};

export default ProductDetailPage;
