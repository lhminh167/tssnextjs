import { Button, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { defaultPaginationList, defaultPaginationRequest, PaginatedList, PaginationRequest } from '../../shared/crud/crud.model';
import { isAnonymous } from '../../shared/helpers/auth.helper';
import { IProduct } from '../../shared/models/product.model';
import ProductHorizontalGallery from '../../shared/product-horizontal-gallery/product-horizontal-gallery.component';
import { getShoppingCartRecommendation } from '../shopping-cart.service';
import { RECOMMENDATION } from '../../shared/tag/tag.model';

interface Props {
}

export default function ShoppingCartProductRecommendationGalleryComponent({
}: Props) {
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
        getData(choice);
    }, []);


    async function getData(input: PaginationRequest) {
        if (!isAnonymous()) return;
        const response = await getShoppingCartRecommendation(input);
        setState(response.content);
        setChoice(input);
    }

    async function change({ pageIndex, pageSize }) {

        const newChoice: PaginationRequest = {
            ...choice,
            pageIndex,
            pageSize
        };

        await getData(newChoice);
    }

    if (!state.count) return null;

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
            //             See All Recommended Products
            //         </Button>
            //     </Link>
            // }
            galleryTestId={RECOMMENDATION}

        />
    );
}

