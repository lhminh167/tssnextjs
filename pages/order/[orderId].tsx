import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import OrderDetailComponent from '../../modules/order/detail/order-detail.component';
import { getCustomerIdNumberFromStore, redirect, toNumber } from '../../modules/shared/helpers/auth.helper';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { Container } from '@material-ui/core';
import { OrderDetailMetadataComponent } from '../../modules/order/detail/order-detail-metadata.component';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
});

export default function OrderDetailPage() {
    const classes = useStyles({});
    const router = useRouter();
    const orderId = toNumber(router.query.orderId as string);

    return (
        <Container>
            <ErrorBoundary>
                <OrderDetailComponent
                    orderId={orderId}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <OrderDetailMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}

OrderDetailPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    const customerId = getCustomerIdNumberFromStore(store);
    if (!isServer && customerId <= 0) {
        redirect(ctx, '/user/login');
        return;
    }
}
