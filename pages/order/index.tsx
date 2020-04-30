import React from "react";
import OrderListComponent from "../../modules/order/list/order-list.component";
import {
  getCustomerIdNumberFromStore,
  redirect
} from "../../modules/shared/helpers/auth.helper";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function OrderListPage() {
  const classes = useStyles({});
  return (
    <Container>
      <OrderListComponent />
    </Container>
  );
}

OrderListPage.getInitialProps = async function({
  ctx: { isServer, store },
  ctx
}) {
  if (isServer) return;
  const customerId = getCustomerIdNumberFromStore(store);
  if (customerId <= 0) {
    redirect(ctx, "/user/login");
    return;
  }
};
