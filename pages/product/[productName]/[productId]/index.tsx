import { Container, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Error from "next/error";
import { useRouter } from "next/router";
import ProductDetailCardComponent from "../../../../modules/product/detail/product-detail-card.component";
import { ProductDetailMetadataComponent } from "../../../../modules/product/detail/product-detail-metadata.component";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import ProductRecommendationComponent from "../../../../modules/product/recommendation/product-recommendation.component";
import ProductReviewListComponent from "../../../../modules/product/review/list/product-review-list.component";
import { IResponse } from "../../../../modules/shared/crud/crud.model";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { isOk } from "../../../../modules/shared/helpers/http.helper";
import { removeTrailingDot } from "../../../../modules/shared/helpers/string.helper";
import { mb, mt } from "../../../../modules/shared/layout/layout.style";
import { IProduct } from "../../../../modules/shared/models/product.model";

const useStyles = makeStyles(() =>
  createStyles({
    mb: mb,
    mt: mt,
  })
);

interface Props extends IResponse<IProduct> {}

function ProductDetailPage({ content: data, status, title }: Props) {
  const router = useRouter();
  const classes = useStyles({});

  if (router.isFallback) return <h1>Loading...</h1>;
  if (!isOk(status))
    return <Error statusCode={status} title={removeTrailingDot(title)} />;

  return (
    <Container className={classes.mb + " " + classes.mt}>
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
        <ProductDetailMetadataComponent data={data} />
      </ErrorBoundary>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const response = await getProduct(toNumber(ctx.query.productId));
  return { props: { ...response } };
}

export default ProductDetailPage;
