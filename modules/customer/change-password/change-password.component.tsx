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
import { CustomerUpdatePasswordState, CustomerUpdatePasswordStateValidator, defaultCustomerUpdatePasswordState } from '../customer.model';
import { updatePassword } from '../customer.service';

const useStyles = makeStyles(theme => ({
    mb: mb,
    mt: mt
}));

interface Props {
    userId: number;
}

export default function ChangePasswordComponent({
    userId
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<CustomerUpdatePasswordState>(defaultCustomerUpdatePasswordState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const errors = new CustomerUpdatePasswordStateValidator().validate(state);

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



        const response = await updatePassword({
            customerId: userId,
            currentPassword: state.currentPassword,
            newPassword: state.newPassword
        })

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
                    Change Password
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='currentPassword'
                    label='Current Password'
                    type='password'
                    autoComplete='current-password'
                    value={state.currentPassword}
                    onChange={change}
                    error={errors.currentPassword && submitted}
                    helperText={errors.currentPassword && submitted ? errors.currentPassword : null}
                />
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
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={submit}
                >
                    Submit
                </Button>
            </Grid>
        </Grid >
    );
}
