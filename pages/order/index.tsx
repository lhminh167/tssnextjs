import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import OrderListComponent from "../../modules/order/list/order-list.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { redirect, getCustomerIdNumberFromStore } from "../../modules/shared/helpers/auth.helper";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function OrderListPage() {
  const classes = useStyles({});
  return (
    <Container>
      <ErrorBoundary>

        <OrderListComponent />
      </ErrorBoundary>

    </Container>
  );
}

OrderListPage.getInitialProps = async function ({
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
