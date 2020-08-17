import { createStyles, makeStyles, Theme, Typography, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IProduct } from '../../shared/models/product.model';
import { getShoppingCartRecommendation } from '../shopping-cart.service';
import ProductHorizontalGallery from '../../shared/product-horizontal-gallery/product-horizontal-gallery.component';
import { PaginatedList, defaultPaginationList, PaginationRequest, defaultPaginationRequest } from '../../shared/crud/crud.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
}

export default function ShoppingCartProductRecommendationGalleryComponent({
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<PaginatedList<IProduct>>({
        ...defaultPaginationList,
        pageSize: 4,
        isPagingEnabled: true
    });
    const [choice, setChoice] = useState<PaginationRequest>({
        ...defaultPaginationRequest,
        pageSize: 4,
        isPagingEnabled: true
    });

    useEffect(() => {
        getShoppingCartRecommendation(choice).then((response) => {
            setState(response.content);
        });
    }, []);


    async function change({ pageIndex, pageSize }) {

        const newChoice: PaginationRequest = {
            ...choice,
            pageIndex,
            pageSize
        }
        const response = await getShoppingCartRecommendation(newChoice);
        setState(response.content);
        setChoice(newChoice);
    }

    if (!state.count) return null;

    return (
        <ProductHorizontalGallery
            data={state}
            output={change}
            title={
                <Typography variant='h6' component='h2'>
                    Product Recommendations
                </Typography>
            }
            seeMore={
                <Link
                    href='/product'
                    as='/product'
                    passHref
                >
                    <Button component='a'
                    >
                        See All Recommended Products
                    </Button>
                </Link>
            }

        />
    );
}

