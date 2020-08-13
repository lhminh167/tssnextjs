import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isValidForm } from '../../shared/validator/validator';
import { CreateCustomerRequestValidator, ICreateCustomerRequest, defaultCreateCustomerRequest } from '../customer.model';
import { currentUserSlice } from '../customer.slice';
import { mb, mb2 } from '../../shared/layout/layout.style';

const useStyles = makeStyles(theme => ({
    mb: mb,
    mb2: mb2
}));

export default function CreateCustomerComponent() {
    const classes = useStyles({});
    const [state, setState] = useState<ICreateCustomerRequest>(defaultCreateCustomerRequest);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const errors = new CreateCustomerRequestValidator().validate(state);
    const dispatch = useDispatch();

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

        dispatch(currentUserSlice.actions.createCustomerPending(state));
    }

    return (
        <Grid
            container
            component='form'
        >
            <Grid
                item
                xs={12}
                justify='center'
                container
                className={classes.mb}
            >
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid
                item
                xs={12}
                justify='center'
                container
                className={classes.mb2}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={state.name}
                        onChange={change}
                        error={errors.name && submitted}
                        helperText={errors.name && submitted ? errors.name : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={state.email}
                        onChange={change}
                        error={errors.email && submitted}
                        helperText={errors.email && submitted ? errors.email : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.password}
                        onChange={change}
                        error={errors.password && submitted}
                        helperText={errors.password && submitted ? errors.password : null}
                        className={classes.mb2}

                    />
                </Grid>
                {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.mb}
                onClick={submit}
            >
                Register
                    </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link
                        href="/user/login"
                        as='/user/login'
                        passHref
                    >
                        <Typography
                            component="a"
                            variant="body2"
                            color="primary"
                        >
                            Already have an account? Login
                                </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>

    );
}
