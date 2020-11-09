import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PaginatedList } from '../../shared/crud/crud.model';
import { defaultProductRecommendationGetRequest, IProduct, IProductRecommendationGetRequest } from '../../shared/models/product.model';
import ProductHorizontalGallery from '../../shared/product-horizontal-gallery/product-horizontal-gallery.component';
import { getProductRecommendation } from '../detail/product-detail.service';
import { RECOMMENDATION } from '../../shared/tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: IProduct;
}

export default function ProductRecommendationComponent({
    data
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<PaginatedList<IProduct>>(data.recommendation);
    const [choice, setChoice] = useState<IProductRecommendationGetRequest>({
        ...defaultProductRecommendationGetRequest,
        productId: data.productId
    });

    useEffect(() => {
        setState(data.recommendation);
        setChoice({
            ...defaultProductRecommendationGetRequest,
            productId: data.productId
        });
    }, [data]);

    async function change({ pageIndex, pageSize }) {

        const newChoice: IProductRecommendationGetRequest = {
            ...choice,
            pageIndex,
            pageSize
        }
        const response = await getProductRecommendation(newChoice);
        setState(response.content);
        setChoice(newChoice);
    }

    return (
        <ProductHorizontalGallery
            data={state}
            output={change}
            title={
                <Typography variant='h6' component='h2'>
                    Customers who bought this item also bought:
                </Typography>
            }
            // seeMore={
            //     <Link
            //         href='/product'
            //         as='/product'
            //         passHref
            //     >
            //         <Button component='a'
            //         >
            //             See All Product Recommendations
            //         </Button>
            //     </Link>
            // }
            galleryTestId={RECOMMENDATION}
        />
    );
}

