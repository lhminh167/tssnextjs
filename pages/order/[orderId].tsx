import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderDetailMetadataComponent } from '../../modules/order/detail/order-detail-metadata.component';
import OrderDetailComponent from '../../modules/order/detail/order-detail.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { toNumber } from '../../modules/shared/helpers/auth.helper';
import { allowCustomerHoc } from '../../modules/shared/allow/allow-customer.component';

function OrderDetailPage() {
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

export default allowCustomerHoc(OrderDetailPage);