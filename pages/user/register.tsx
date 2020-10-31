import Container from '@material-ui/core/Container';
import React from 'react';
import { CreateCustomerMetadataComponent } from '../../modules/customer/create/create-customer-metadata.component';
import RegisterComponent from '../../modules/customer/create/create-customer.component';
import { allowNotLoggedInHoc } from '../../modules/shared/allow/allow-not-logged-in.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';

function RegisterPage(props) {

    return (
        <Container
            maxWidth='sm'
        >
            <ErrorBoundary>
                <RegisterComponent />
            </ErrorBoundary>
            <ErrorBoundary>
                <CreateCustomerMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}

export default RegisterPage;
