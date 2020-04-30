import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { getCustomerIdNumberFromStore, redirect } from '../../modules/shared/helpers/auth.helper';
import CategoryDetailComponent from '../../modules/category/detail/category-detail.component';
import { ICategory } from '../../modules/shared/models/category.model';
import { getCategory } from '../../modules/category/category.service';
import { Container } from '@material-ui/core';
import CategoryDetailProductListComponent from '../../modules/category/detail/product-list/category-detail-product-list.component';

const useStyles = makeStyles({
});

interface Props {
    data: ICategory
}

export default function CategoryDetailPage({
    data
}: Props) {
    const classes = useStyles({});
    return (
        <Container>
            <CategoryDetailComponent
                data={data}
            />
            <CategoryDetailProductListComponent
                data={data}
            />
        </Container>

    );
}

CategoryDetailPage.getInitialProps = async function ({
    ctx: {
        query
    }
}) {

    // const { query } = ctx;
    const response: any = await getCategory(Number(query.categoryId));

    return { data: response.content };
}
