import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { OrderDetailMetadataComponent } from '../../modules/order/detail/order-detail-metadata.component';
import OrderDetailComponent from '../../modules/order/detail/order-detail.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { allowCustomer, toNumber } from '../../modules/shared/helpers/auth.helper';

const useStyles = makeStyles({
});

export default function OrderDetailPage() {
    const classes = useStyles({});
    const router = useRouter();
    const orderId = toNumber(router.query.orderId as string);

    useEffect(() => allowCustomer(), []);

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
