import Container from '@material-ui/core/Container'; import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ResetPasswordComponent from '../../../../modules/customer/reset-password/reset-password.component';
import ErrorBoundary from '../../../../modules/shared/error-boundary/error-boundary.component';
import { ResetPasswordMetadataComponent } from '../../../../modules/customer/reset-password/reset-password-metadata.component';

const useStyles = makeStyles(theme => ({
}));

interface Props {
}

export default function ResetPasswordPage({

}: Props) {
    const classes = useStyles({});

    return (
        <Container>
            <ErrorBoundary>
                <ResetPasswordComponent />
            </ErrorBoundary>
            <ErrorBoundary>
                <ResetPasswordMetadataComponent />
            </ErrorBoundary>
        </Container >
    );
}
