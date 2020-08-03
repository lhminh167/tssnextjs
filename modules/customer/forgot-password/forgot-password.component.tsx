import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { mb, mt } from '../../shared/layout/layout.style';
import { isValidForm } from '../../shared/validator/validator';
import { CustomerForgotPasswordRequest, CustomerForgotPasswordRequestValidator, defaultCustomerForgotPasswordRequest } from '../customer.model';
import { forgotPassword } from '../customer.service';

const useStyles = makeStyles(theme => ({
    mb: mb,
    mt: mt
}));

interface Props {
}

export default function ForgotPasswordComponent({
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<CustomerForgotPasswordRequest>(defaultCustomerForgotPasswordRequest);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const errors = new CustomerForgotPasswordRequestValidator().validate(state);

    function change(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value,
        });
    }

    async function submit(event) {
        setSubmitted(true);

        if (!isValidForm(errors)) return;



        const response = await forgotPassword(state);

    }

    return (
        <Grid
            container
            spacing={2}
            component='form'
            noValidate
        >
            <Grid item xs={12}
                container
                justify="center"
                className={classes.mt}
            >
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid item xs={12}
                container
                justify="center"
                className={classes.mb}
            >
                <Typography
                    component="h1"
                    variant="h5"
                >
                    Password assistance
                </Typography>
            </Grid>
            <Grid item xs={12}
                container
            // justify="center"
            // className={classes.mb}
            >
                <Typography
                    component="p"
                    variant="body1"
                >
                    Please enter email address associated with your account.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    value={state.email}
                    onChange={change}
                    error={errors.email && submitted}
                    helperText={errors.email && submitted ? errors.email : null}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid >
    );
}
