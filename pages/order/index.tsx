import Container from '@material-ui/core/Container';
import React from 'react';
import { OrderListMetadataComponent } from '../../modules/order/list/order-list-metadata.component';
import OrderListComponent from '../../modules/order/list/order-list.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { allowCustomerHoc } from '../../modules/shared/allow/allow-customer.component';

function OrderListPage() {

  return (
    <Container>
      <ErrorBoundary>
        <OrderListComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <OrderListMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export default allowCustomerHoc(OrderListPage)
