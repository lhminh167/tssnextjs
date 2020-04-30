import { Container, createStyles, makeStyles, Paper, Divider } from "@material-ui/core";
import ProductDetailCardComponent from "../../../modules/product/detail/product-detail-card.component";
import { getProduct } from "../../../modules/product/detail/product-detail.service";
import ProductRecommendationComponent from "../../../modules/product/recommendation/product-recommendation.component";
import ProductReviewListComponent from "../../../modules/product/review/list/product-review-list.component";
import { IProduct } from "../../../modules/shared/models/product.model";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import { p, mb } from "../../../modules/shared/layout/layout.style";

const useStyles = makeStyles(() => createStyles({
  p: p,
  mb: mb

}));

function ProductDetailPage(data: IProduct) {
  const classes = useStyles({});
  return (
    <Container>
      <Paper
      >
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
