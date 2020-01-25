import { createMuiTheme, createStyles, Fab, Grid, TextField, Theme, ThemeProvider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../root/root.model';
import { getCustomerId } from '../shared/helpers/auth.helper';
import theme, { themeColor } from '../shared/layout/layout.theme';
import { IProduct } from '../shared/models/product.model';
import { CreateReviewRequestValidator, IReview } from '../shared/models/review.model';
import { isValidForm } from '../shared/validator/validator';

const inputTheme = createMuiTheme({
    ...theme,
    overrides: {
        MuiOutlinedInput: {
            notchedOutline: {
                // border: 'none',
            },
            root: {
                background: "white"
            }
        },
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        card: {
            padding: theme.spacing(2),
            background: themeColor.secondaryGrey

        }
    }),
);

interface Props {
    data?: IProduct;
}

export default function CreateReviewComponent(props: Props) {
    const { data } = props;
    const classes = useStyles({});
    const customerId = useSelector(
        (state: IRootState) => state.currentUser.data.customerId
    );


    const [state, setState] = useState<IReview>({
        customerId: getCustomerId(customerId),
        productId: data.productId,
        review1: '',
        rating: 0,
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const errors = new CreateReviewRequestValidator().validate(state);

    function change(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value,
        });
    }

    function submit(event): void {
        setSubmitted(true);

        if (!isValidForm(errors)) return;

        // dispatch(currentUser.actions.loginPending({
        //     content: state
        // }));
    }


    return (
        <Card
            className={classes.card}
        >
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
                    // noValidate
                    >
                        <Grid item sm={5}>
                            Your Review
                        </Grid>
                        <Grid item sm={7}>
                            {/* <Input
                            value={state.review1}
                            onChange={change}
                            // InputLabelProps={{ shrink: true }}
                            // error={errors.email && submitted}
                            // helperText={errors.email && submitted ? errors.email : null}
                            /> */}
                            <ThemeProvider theme={inputTheme}>
                                <TextField
                                    InputProps={{
                                        // startAdornment: (
                                        //     <InputAdornment position="start">
                                        //         <SearchIcon
                                        //             color="primary"
                                        //         />
                                        //     </InputAdornment>
                                        // ),
                                    }}
                                    variant="outlined"
                                    margin="dense"
                                    // fullWidth={fullWidth}
                                    // className={className}
                                    value={state.review1}
                                    onChange={change}
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
                            <Rating
                                name="rating"
                                value={5}
                                readOnly
                            />
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
                            // className={classes.button} 
                            // onClick={handleApply}
                            >
                                Submit
                            </Fab>
                        </Grid>
                    </Grid>



                </Grid>
            </Grid>
        </Card >

    );
}
