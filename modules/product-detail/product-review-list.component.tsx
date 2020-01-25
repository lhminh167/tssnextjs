import { createStyles, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { IReview } from '../shared/models/review.model';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 'bold'
        }
        
    }),
);

interface Props {
    data?: IReview[];
}

export default function ProductReviewListComponent(props: Props) {
    const { data } = props;
    const classes = useStyles({});

    return (
 
        <Grid item container
            component="ul"
            xs={12}
        >
            {data?.map(entry => (
                <Grid item container
                    component="li"
                    xs={12}
                    key={entry.reviewId}
                >
                    <Grid item xs={5}>
                        <Rating name="read-only" value={5} readOnly />
                        <Typography
                            component="h2"
                            variant="subtitle1"
                    className={classes.bold}
                        >
                            {entry.customer.name}
                        </Typography>
                        <Typography
                            component="h3"
                            variant="subtitle2"
                        >
                            {entry.createdOn}
                        </Typography>

                    </Grid>
                    <Grid item xs={7}>
                        <Typography
                            component="p"
                            variant="body1"
                            gutterBottom
                        >
                            {entry.review1}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}
