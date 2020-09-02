import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useState } from 'react';
import { defaultProductSearchRequest, IProductSearchRequest } from '../../../product/filter/product-filter.model';
import { getProducts } from '../../../product/filter/product-filter.service';
import { PaginatedList } from '../../../shared/crud/crud.model';
import { ICategory } from '../../../shared/models/category.model';
import { IProduct } from '../../../shared/models/product.model';
import ProductHorizontalGallery from '../../../shared/product-horizontal-gallery/product-horizontal-gallery.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: ICategory;
}

export default function CategoryDetailProductListComponent({
    data
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<PaginatedList<IProduct>>(data.product);
    const [choice, setChoice] = useState<IProductSearchRequest>({
        ...defaultProductSearchRequest,
        category: [data.name]
    });

    async function changePageIndex({ pageIndex, pageSize }) {

        const newChoice: IProductSearchRequest = {
            ...choice,
            pageIndex,
            pageSize
        };
        const response = await getProducts(newChoice);
        setState(response.content);
        setChoice(newChoice);
    }

    return (
        <ProductHorizontalGallery
            data={state}
            output={changePageIndex}
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
