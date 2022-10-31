import { Container } from "@mui/material";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { EditProductMetadataComponent } from "../../../../modules/product/edit/edit-product-metadata.component";
import EditProductComponent from "../../../../modules/product/edit/edit-product.component";
import { allowAdminHoc } from "../../../../modules/shared/allow/allow-admin.component";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { isOk } from "../../../../modules/shared/helpers/http.helper";
import { removeTrailingDot } from "../../../../modules/shared/helpers/string.helper";
import { IProduct } from "../../../../modules/shared/models/product.model";
import Error from 'next/error';
import { IResponse } from "../../../../modules/shared/crud/crud.model";

interface Props extends IResponse<IProduct> {
}

function ProductEditPage({
    content: data,
    status,
    title
}: Props) {
    if (!isOk(status)) return <Error statusCode={status} title={removeTrailingDot(title)} />;

    return (
        <Container>
            <ErrorBoundary>
                <EditProductComponent
                    data={data}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <EditProductMetadataComponent
                    data={data}
                />
            </ErrorBoundary>
        </Container>
    );
}

export async function getServerSideProps(ctx) {
    const response = await getProduct(toNumber(ctx.query.productId));
    return { props: { ...response } }
}

export default allowAdminHoc(ProductEditPage);