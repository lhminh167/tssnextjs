import { createMuiTheme, createStyles, Fab, FormControl, FormHelperText, Grid, Paper, TextField, Theme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../root/root.model';
import { toNumber } from '../../../shared/helpers/auth.helper';
import theme from '../../../shared/layout/layout.theme';
import { IProduct } from '../../../shared/models/product.model';
import { CreateReviewRequestValidator, IReview } from '../../../shared/models/review.model';
import { isValidForm } from '../../../shared/validator/validator';
import { createReview } from '../review.service';

const inputTheme = createMuiTheme({
    ...theme,
    overrides: {
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: IProduct;
    output: any;
}

export default function CreateReviewComponent({
    data,
    output
}: Props) {
    const classes = useStyles({});
    const customerId: number = useSelector(
        (state: IRootState) => toNumber(state.currentUser.data.customerId)
    );
    const defaultReview: IReview = {
        customerId: customerId,
        productId: data.productId,
        review1: '',
        rating: 0,
    };
    const [state, setState] = useState<IReview>(defaultReview);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const errors = new CreateReviewRequestValidator().validate(state);

    useEffect(() => {
        setState({
            ...state,
            customerId
        })
    }, [customerId]);

    function change(event) {
        const target = event.target;
        const name = target.name;
        const value = target.name === 'rating' ? Number(target.value) : target.value;

        setState({
            ...state,
            [name]: value,
        });
    }

    async function submit(): Promise<void> {
        try {
            setSubmitted(true);
            if (!isValidForm(errors)) return;
            const response = await createReview(state);
            setState(defaultReview);
            setSubmitted(false);
            output(response.content);
        } catch (e) {
        }
    }

    if (customerId <= 0)
        return (
            <Grid
                container
                component={Paper}
            >
                <Grid item xs={12}>
                    <Typography
                        component="h2"
                        variant="subtitle1"
                        gutterBottom
                    >
                        Add a review
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="span"
                        variant="subtitle2"
                        gutterBottom
                    >
                        Please <Link
                            href="/user/login"
                            as="/user/login"
                            passHref
                        >
                            <Typography
                                color="primary"
                                variant="subtitle2"
                                component="a"
                            >
                                login
                            </Typography>
                        </Link> or <Link
                            href="/user/register"
                            as="/user/register"
                            passHref
                        >
                            <Typography
                                color="primary"
                                variant="subtitle2"
                                component="a"
                            >
                                register
                            </Typography>
                        </Link> to add a review.
                    </Typography>
                </Grid>
            </Grid>
        );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography
                    component="h2"
                    variant="subtitle1"
                    gutterBottom
                >
                    Add a review
                    </Typography>
            </Grid>
            <Grid item container xs={12}
                component="form"
                noValidate
            >
                <Grid
                    item container xs={12}
                >
                    <Grid item sm={5}>
                        Your Review
                        </Grid>
                    <Grid item sm={7}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField
                                multiline
                                name="review1"
                                variant="outlined"
                                margin="dense"
                                value={state.review1}
                                onChange={change}
                                error={errors.review1 && submitted}
                                helperText={errors.review1 && submitted ? errors.review1 : null}
                            />
                        </ThemeProvider>
                    </Grid>
                </Grid>
                <Grid
                    item container xs={12}
                >
                    <Grid item sm={5}>
                        Overall Rating
                        </Grid>
                    <Grid item sm={7}>
                        <FormControl
                            error
                        >
                            <Rating
                                id="rating"
                                name="rating"
                                value={state.rating}
                                onChange={change}
                            />
                            {
                                errors.rating && submitted &&
                                < FormHelperText
                                >
                                    {errors.rating}
                                </FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    item container xs={12}
                >
                    <Grid item sm={5}>
                    </Grid>
                    <Grid item sm={7}>
                        <Fab
                            variant="extended"
                            color="primary"
                            size="small"
                            onClick={submit}
                        >
                            Submit
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
