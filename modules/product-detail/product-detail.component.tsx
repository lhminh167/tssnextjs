import { Container, createStyles, Divider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IProduct } from '../shared/models/product.model';
import CreateReviewComponent from './create-product-review.component';
import ProductDetailCardComponent from './product-detail-card.component';
import ProductReviewComponent from './product-review.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    container: {
        padding: theme.spacing(2),

    }
  }),
);


interface Props {
    data?: IProduct;
}

export default function ProductDetailComponent(props: Props) {
    const { data } = props;
    const classes = useStyles({});

    return (
        <Container 
        maxWidth="xl"
        className={classes.container}
        >

            <ProductDetailCardComponent
                data={data}
            />
            <ProductReviewComponent
                data={data.review}
            />
            <Divider />
            <CreateReviewComponent data={data}/>
        </Container>

    );
}
