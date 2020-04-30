import NewOrderComponent from "../../modules/order/create/create-order.component";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import {
  redirect,
  getCustomerIdNumberFromStore
} from "../../modules/shared/helpers/auth.helper";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function NewOrderPage() {
  const classes = useStyles({});
  return (
    <Container>
      <NewOrderComponent />
    </Container>
  );
}

NewOrderPage.getInitialProps = async function({
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
