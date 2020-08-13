import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import LoginComponent from '../../modules/customer/login/login.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { Container } from '@material-ui/core';
import { LoginMetadataComponent } from '../../modules/customer/login/login-metadata.component';
import { useRouter } from 'next/router';
import { getLoginToken } from '../../modules/shared/helpers/token.helper';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function LoginPage(props) {
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
                <LoginComponent />
            </ErrorBoundary>
            <ErrorBoundary>
                <LoginMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}
