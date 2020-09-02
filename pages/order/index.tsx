import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { OrderListMetadataComponent } from '../../modules/order/list/order-list-metadata.component';
import OrderListComponent from '../../modules/order/list/order-list.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { allowCustomer } from '../../modules/shared/helpers/auth.helper';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function OrderListPage() {
  const classes = useStyles({});

  useEffect(() => allowCustomer(), []);

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
