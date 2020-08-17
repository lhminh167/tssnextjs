import { makeStyles, createStyles, Container } from "@material-ui/core";
import { IProduct } from "../../../../modules/shared/models/product.model";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLoginToken } from "../../../../modules/shared/helpers/token.helper";
import ErrorBoundary from "../../../../modules/shared/error-boundary/error-boundary.component";
import EditProductComponent from "../../../../modules/product/edit/edit-product.component";
import { getProducts } from "../../../../modules/product/filter/product-filter.service";
import { defaultProductSearchRequest } from "../../../../modules/product/filter/product-filter.model";
import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { defaultPaginationRequest } from "../../../../modules/shared/crud/crud.model";
import { toUrl } from "../../../../modules/shared/helpers/string.helper";
import { allowCustomer } from "../../../../modules/shared/helpers/auth.helper";

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
    const router = useRouter();

    useEffect(() => allowCustomer(), []);

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
        revalidate: 5
    }
};