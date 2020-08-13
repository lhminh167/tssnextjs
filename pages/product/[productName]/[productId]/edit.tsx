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

    useEffect(() => {
        if (!getLoginToken()) router.push("/user/login");
    }, []);

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

    const res = await getProducts(defaultProductSearchRequest)
    const items: IProduct[] = res.content.items;

    const paths = items.map((item) => ({
        params: {
            productName: item.name.toString(),
            productId: item.productId.toString()
        },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

    const response = await getProduct(params.productId);

    return {
        props: { data: response.content },
        revalidate: null
    }
}