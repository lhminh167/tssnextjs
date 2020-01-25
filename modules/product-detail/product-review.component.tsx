import { createStyles, Grid, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { themeColor } from '../shared/layout/layout.theme';
import { IReview } from '../shared/models/review.model';
import ProductReviewListComponent from './product-review-list.component';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        card: {
            padding: theme.spacing(2),
            background: themeColor.secondaryGrey

        },
        bold: {
            fontWeight: 'bold'
        }
        
    }),
);

interface Props {
    data?: IReview[];
}

export default function ProductReviewComponent(props: Props) {
    const { data } = props;
    const classes = useStyles({});
    const dispatch = useDispatch();

    return (
        <Card
            className={classes.card}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography
                        component="h2"
                        variant="h6"
                        className={classes.bold}

                    >
                        Product reviews
                    </Typography>
                </Grid>
                <ProductReviewListComponent data={data}/>
            </Grid>
        </Card >

    );
}
