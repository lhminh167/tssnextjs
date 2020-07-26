import NewOrderComponent from "../../modules/order/create/create-order.component";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import {
  redirect,
  getCustomerIdNumberFromStore
} from "../../modules/shared/helpers/auth.helper";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function NewOrderPage() {
  const classes = useStyles({});
  return (
    <Container>
      <ErrorBoundary>
        <NewOrderComponent />
      </ErrorBoundary>
    </Container>
  );
}

NewOrderPage.getInitialProps = async function ({
  ctx: { isServer, store },
  ctx
}) {
  if (isServer) {
    redirect(ctx, "/shopping-cart", "/checkout");
    return;
  }

  const state = store.getState();
  const customerId = getCustomerIdNumberFromStore(store);

  if (customerId <= 0) {
    redirect(ctx, "/user/login");
    return;
  }

  if (state.shoppingCartItemCount.data <= 0) {
    redirect(ctx, "/");
    return;
  }
};

export default NewOrderPage;
