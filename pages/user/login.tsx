import Container from '@mui/material/Container';
import React from 'react';
import { LoginMetadataComponent } from '../../modules/customer/login/login-metadata.component';
import LoginComponent from '../../modules/customer/login/login.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { allowNotLoggedInHoc } from '../../modules/shared/allow/allow-not-logged-in.component';

function LoginPage() {
    return (
        <Container
            maxWidth='sm'
        >
            <ErrorBoundary>
                <LoginComponent />
            </ErrorBoundary>
            <ErrorBoundary>
                <LoginMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}

export default allowNotLoggedInHoc(LoginPage);