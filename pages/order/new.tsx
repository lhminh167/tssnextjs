import Container from '@material-ui/core/Container';
import { CreateOrderMetadataComponent } from '../../modules/order/create/create-order-metadata.component';
import CreateOrderComponent from '../../modules/order/create/create-order.component';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';
import { allowCheckoutHoc } from '../../modules/shared/allow/allow-checkout.component';

function NewOrderPage() {

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

export default allowCheckoutHoc(NewOrderPage);
