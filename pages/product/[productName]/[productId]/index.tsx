import { makeStyles, createStyles, Container, Paper } from "@material-ui/core";
import { mb, mt } from "../../../../modules/shared/layout/layout.style";
import { IProduct } from "../../../../modules/shared/models/product.model";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";
import ProductDetailCardComponent from "../../../../modules/product/detail/product-detail-card.component";
import ProductReviewListComponent from "../../../../modules/product/review/list/product-review-list.component";
import ProductRecommendationComponent from "../../../../modules/product/recommendation/product-recommendation.component";
import { ProductDetailMetadataComponent } from "../../../../modules/product/detail/product-detail-metadata.component";
import { getProducts } from "../../../../modules/product/filter/product-filter.service";
import { defaultProductSearchRequest } from "../../../../modules/product/filter/product-filter.model";
import { toUrl } from "../../../../modules/shared/helpers/string.helper";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { defaultPaginationRequest } from "../../../../modules/shared/crud/crud.model";
import { revalidateInterval } from "../../../../modules/shared/helpers/http.helper";

const useStyles = makeStyles(() => createStyles({
    mb: mb,
    mt: mt
}));

interface Props {
    data?: IProduct;
}

export default function ProductDetailPage({
    data
}: Props) {
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

export async function getStaticPaths() {

    const res = await getProducts({ ...defaultProductSearchRequest, ...defaultPaginationRequest })
    const items: IProduct[] = res.content.items;

    const paths = items.map((item) => ({
        params: {
            productName: toUrl(item.name),
            productId: item.productId.toString()
        },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const response: any = await getProduct(params.productId);

    return {
        props: { data: response.content },
        revalidate: revalidateInterval
    }
};