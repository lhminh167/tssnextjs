import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IReview } from '../../../shared/models/review.model';
import { deleteReview, updateReview } from '../review.service';
import { useState, Fragment } from 'react';
import ProductReviewDeleteComponent from '../delete/product-review-delete.component';
import ProductReviewEditComponent from '../edit/product-review-edit.component';
import { formatDatetime } from '../../../shared/helpers/string.helper';
import { bold } from '../../../shared/layout/layout.style';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: bold
    }),
);

interface Props {
    data: IReview;
}

export default function ProductReviewComponent({
    data,
}: Props) {
    const classes = useStyles({});

    return (
        <Fragment
        >
            <Grid
                item
                xs={12}
                sm={4}
            >
                <Rating
                    value={data.rating}
                    readOnly
                    max={5}
                />
                <Typography
                    component='h3'
                    variant='subtitle1'
                    className={classes.bold}
                >
                    {data.customer.name}
                </Typography>
                <Typography
                    variant='subtitle2'
                    component='time'
                >
                    {formatDatetime(data.createdOn)}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
            >
                <Typography
                    component='p'
                    variant='body1'
                    gutterBottom
                >
                    {data.review1}
                </Typography>
            </Grid>
        </Fragment>
    );
}
