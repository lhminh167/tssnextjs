import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ILoginRequest, LoginRequestValidator } from '../customer.model';
import { currentUser } from '../customer.slice';
import { isValidForm } from '../../shared/validator/validator';
import Link from 'next/link';



const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
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

        dispatch(currentUser.actions.loginPending(state));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
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
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
                        error={errors.password && submitted}
                        helperText={errors.password && submitted ? errors.password : null}
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
                        className={classes.submit}
                        onClick={submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link
                                href="/"
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
                        </Grid> */}
                        <Grid item>
                            <Link
                                href="/user/register"
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
                </form>
            </div>
        </Container>
    );
}
