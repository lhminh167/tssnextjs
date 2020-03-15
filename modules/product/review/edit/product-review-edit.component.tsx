import { createMuiTheme, createStyles, Fab, FormControl, FormHelperText, Grid, Paper, TextField, Theme, ThemeProvider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../root/root.model';
import theme, { themeColor } from '../../../shared/layout/layout.theme';
import { IProduct } from '../../../shared/models/product.model';
import { CreateReviewRequestValidator, IReview } from '../../../shared/models/review.model';
import { isValidForm } from '../../../shared/validator/validator';
import { toNumber } from '../../../shared/helpers/auth.helper';
import { createReview, updateReview } from '../review.service';

const inputTheme = createMuiTheme({
    ...theme,
    overrides: {
        // MuiOutlinedInput: {
        //     notchedOutline: {
        //         // border: 'none',
        //     },
        //     root: {
        //         background: "white"
        //     }
        // },
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: IReview;
    output: any;
    close: any;
}

export default function ProductReviewEditComponent({
    data,
    output,
    close
}: Props) {
    const classes = useStyles({});
    const customerId: number = useSelector(
        (state: IRootState) => toNumber(state.currentUser.data.customerId)
    );
    const [state, setState] = useState<IReview>(data);
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

    async function submit() {
        try {
setSubmitted(true);
        if (!isValidForm(errors)) return;
        const response = await updateReview(state);
        setSubmitted(false);
        output(response.content);
        }
        catch(e){
        }
    }

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
                        >
                            <Rating
                                id="rating"
                                name="rating"
                                value={state.rating}
                                onChange={change}
                                max={5}
                            />
                            {
                                errors.rating && submitted &&
                                < FormHelperText
                                    id="rating"
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
                        <Fab
                            // variant="extended"
                            // color="primary"
                            size="small"
                            onClick={close}
                        >
                            Cancel
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
