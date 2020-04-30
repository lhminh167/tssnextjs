import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { getCategory } from '../../modules/category/category.service';
import CategoryDetailComponent from '../../modules/category/detail/category-detail.component';
import CategoryDetailProductListComponent from '../../modules/category/detail/product-list/category-detail-product-list.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { ICategory } from '../../modules/shared/models/category.model';

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
            <ErrorBoundary>

                <CategoryDetailComponent
                    data={data}
                />
            </ErrorBoundary>
            <ErrorBoundary>

                <CategoryDetailProductListComponent
                    data={data}
                />
            </ErrorBoundary>

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
