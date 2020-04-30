import { Container, createStyles, makeStyles } from "@material-ui/core";
import { getProduct } from "../../../modules/product/detail/product-detail.service";
import EditProductComponent from "../../../modules/product/edit/edit-product.component";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import { IProduct } from "../../../modules/shared/models/product.model";

const useStyles = makeStyles(() =>
    createStyles({
    }),
);

interface Props {
    data?: IProduct;
}

export default function ProductEditPage({
    data
}: Props) {
    const classes = useStyles({});

    return (
        <Container>
            <ErrorBoundary>
                <EditProductComponent
                    data={data}
                />
            </ErrorBoundary>
        </Container>
    );
}

ProductEditPage.getInitialProps = async function ({ ctx }) {
    const { query } = ctx;
    const response: any = await getProduct(query.productId);
    return { data: response.content };
}
