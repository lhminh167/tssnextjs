import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState, useEffect } from 'react';
import { mb, mt } from '../../shared/layout/layout.style';
import { isValidForm } from '../../shared/validator/validator';
import { CustomerPasswordResetState, CustomerPasswordResetStateValidator, defaultCustomerPasswordResetState } from '../customer.model';
import { resetPassword, validateResetPasswordToken } from '../customer.service';
import { useRouter } from 'next/router';
import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, SUBMIT } from '../../shared/tag/tag.model';

const useStyles = makeStyles(theme => ({
    mb: mb,
    mt: mt
}));

interface Props {
}

export default function ResetPasswordComponent({
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<CustomerPasswordResetState>(defaultCustomerPasswordResetState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isValidToken, setIsValidToken] = useState<boolean>(false);
    const errors = new CustomerPasswordResetStateValidator().validate(state);
    const router = useRouter();
    const customerId: number = router.query.userId as any;
    const resetPasswordToken: string = router.query.resetPasswordToken as any;

    useEffect(() => {
        validateResetPasswordToken({
            customerId,
            resetPasswordToken
        }).then(res => {
            if (res.status < 300)
                setIsValidToken(true);
        })
    }, []);

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



        const response = await resetPassword({
            customerId,
            resetPasswordToken,
            newPassword: state.newPassword
        })

    }

    if (isValidToken) return (
        <Grid
            container
        >
            <Grid item xs={12}
                container
                justify='center'
                className={classes.mt}
            >
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid item xs={12}
                container
                justify='center'
                className={classes.mb}
            >
                <Typography component='h1' variant='h5'>
                    Reset Password
                </Typography>
            </Grid>
            <Grid item xs={12}
                container
                justify='center'
                className={classes.mb}
            >
                <Typography component='h1' variant='h5'
                    data-cy={NEW_PASSWORD}
                >
                    The password reset link that you provided is invalid or has expired.
                </Typography>
            </Grid>

        </Grid>
    )

    return (
        <Grid
            container
            spacing={2}
            component='form'
            noValidate
        >
            <Grid item xs={12}
                container
                justify='center'
                className={classes.mt}
            >
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </Grid>
            <Grid item xs={12}
                container
                justify='center'
                className={classes.mb}
            >
                <Typography component='h1' variant='h5'>
                    Reset Password
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='newPassword'
                    label='New Password'
                    type='password'
                    autoComplete='new-password'
                    value={state.newPassword}
                    onChange={change}
                    error={errors.newPassword && submitted}
                    helperText={errors.newPassword && submitted ? errors.newPassword : null}
                    data-cy={NEW_PASSWORD}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='confirmNewPassword'
                    label='Confirm New Password'
                    type='password'
                    autoComplete='new-password'
                    value={state.confirmNewPassword}
                    onChange={change}
                    error={errors.confirmNewPassword && submitted}
                    helperText={errors.confirmNewPassword && submitted ? errors.confirmNewPassword : null}
                    data-cy={CONFIRM_NEW_PASSWORD}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={submit}
                    data-cy={SUBMIT}
                >
                    Submit
                </Button>
            </Grid>
        </Grid >
    );
}
