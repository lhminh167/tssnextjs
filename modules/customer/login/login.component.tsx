import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isValidForm } from '../../shared/validator/validator';
import { ILoginRequest, LoginRequestValidator } from '../customer.model';
import { currentUserSlice } from '../customer.slice';
import { mb, mb2 } from '../../shared/layout/layout.style';

const useStyles = makeStyles(theme => ({
    mb: mb,
    mb2: mb2
}));

export default function LoginComponent() {
    const classes = useStyles({});
    const [state, setState] = useState<ILoginRequest>({
        email: "",
        password: ""
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const errors = new LoginRequestValidator().validate(state);

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

        dispatch(currentUserSlice.actions.loginPending(state));
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
                className={classes.mb}

            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
            </Grid>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={state.email}
                onChange={change}
                error={errors.email && submitted}
                helperText={errors.email && submitted ? errors.email : null}
            />
            <TextField
                variant="outlined"
                margin="normal"
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
            {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.mb}
                onClick={submit}
            >
                Sign In
                    </Button>
            <Grid container>
                <Grid item xs>
                    <Link
                        href="/user/forgot-password"
                        as='/user/forgot-password'
                        passHref
                    >
                        <Typography
                            variant="body2"
                            component="a"
                            color="primary"

                        >
                            Forgot password?
                                </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        href="/user/register"
                        as='/user/register'
                        passHref
                    >
                        <Typography
                            component="a"
                            variant="body2"
                            color="primary"

                        >
                            Don't have an account? Sign Up
                                </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}
