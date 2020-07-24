import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ResetPasswordComponent from '../../../../modules/customer/reset-password/reset-password.component';

const useStyles = makeStyles(theme => ({
}));

interface Props {
}

export default function ResetPasswordPage({

}: Props) {
    const classes = useStyles({});

    return (
        <Container>
            <ResetPasswordComponent
            />
        </Container >
    );
}
