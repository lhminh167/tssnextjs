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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
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
                                InputLabelProps={{ shrink: true }}
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
                                InputLabelProps={{ shrink: true }}
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
                                InputLabelProps={{ shrink: true }}
                                error={errors.password && submitted}
                                helperText={errors.password && submitted ? errors.password : null}
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
                        className={classes.submit}
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
                </form>
            </div>

        </Container>
    );
}
