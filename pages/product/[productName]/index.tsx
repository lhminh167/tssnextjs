import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ProductDetailComponent from '../../../modules/product-detail/product-detail.component';
import { getProduct } from '../../../modules/product-detail/product-detail.service';

const useStyles = makeStyles(() =>
    createStyles({
    }),
);

interface Props {
    data?: any;
}

function ProductDetailPage(props: Props) {
    const { data } = props;

    return (
        <ProductDetailComponent data={data} />
    );
}

ProductDetailPage.getInitialProps = async function ({ ctx }) {
    const { query } = ctx;
    const response: any = await getProduct(query.productId);
    return { data: response.content };
}

export default ProductDetailPage;
