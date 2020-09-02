import { Container, createStyles, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import EditProductComponent from "../../../../modules/product/edit/edit-product.component";
import { defaultProductSearchRequest } from "../../../../modules/product/filter/product-filter.model";
import { getProducts } from "../../../../modules/product/filter/product-filter.service";
import { defaultPaginationRequest } from "../../../../modules/shared/crud/crud.model";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";
import { toUrl } from "../../../../modules/shared/helpers/string.helper";
import { IProduct } from "../../../../modules/shared/models/product.model";
import { allowAdminHoc } from "../../../../modules/shared/allow/allow-admin.component";
import { revalidateInterval } from "../../../../modules/shared/helpers/http.helper";

interface Props {
    data?: IProduct;
}

function ProductEditPage({
    data
}: Props) {

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

export default allowAdminHoc(ProductEditPage);

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