import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import CustomerEditComponent from '../../../modules/customer/edit/edit-customer.component';
import { redirect, toNumber } from '../../../modules/shared/helpers/auth.helper';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { mb, mt } from '../../../modules/shared/layout/layout.style';
import { CustomerEditMetadataComponent } from '../../../modules/customer/edit/edit-customer-metadata.component';
import { useRouter } from 'next/router';
import { getLoginToken } from '../../../modules/shared/helpers/token.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        mt: mt
    }),
);

interface Props {
}

export default function CustomerEditPage({
}: Props) {
    const classes = useStyles({});
    const router = useRouter();
    const userId = toNumber(router.query.userId as string);

    useEffect(() => {
        if (!getLoginToken()) router.push("/user/login");
    }, []);

    return (
        <Container
            className={classes.mb + ' ' + classes.mt}
        >
            <ErrorBoundary>
                <CustomerEditComponent
                    userId={userId}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CustomerEditMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}
