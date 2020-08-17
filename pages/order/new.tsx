import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useEffect } from 'react';
import { CreateOrderMetadataComponent } from '../../modules/order/create/create-order-metadata.component';
import CreateOrderComponent from '../../modules/order/create/create-order.component';
import { state, store } from '../../modules/root/root.store';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import {
  allowCustomer,
  goTo
} from '../../modules/shared/helpers/auth.helper';
import { IRootState } from '../../modules/root/root.model';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function NewOrderPage() {
  const classes = useStyles({});

  useEffect(() => {
    debugger
    allowCustomer();
    const count = (store.getState() as IRootState).shoppingCartItemCount.data;
    debugger
    if (count <= 0) goTo('/');
  }, []);


  return (
    <Container>
      <ErrorBoundary>
        <CreateOrderComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <CreateOrderMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export default NewOrderPage;
