import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CreateCustomerMetadataComponent } from '../../modules/customer/create/create-customer-metadata.component';
import RegisterComponent from '../../modules/customer/create/create-customer.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { getLoginToken } from '../../modules/shared/helpers/token.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

function RegisterPage(props) {
    const classes = useStyles(props);
    const router = useRouter();

    useEffect(() => {
        if (getLoginToken()) router.push(router.query.next as string);
    }, []);

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

export default RegisterPage
