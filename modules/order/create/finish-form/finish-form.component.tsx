import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { RocketIcon } from "../../../shared/svg/svg.component";
import { Order } from "../../order.model";

interface Props {
  back: any;
  data: Order;
}

export default function FinishFormComponent({ back, data }: Props) {
  return (
    <Grid container alignItems="center" direction="column">
      <RocketIcon
        color="primary"
        style={{
          fontSize: "16rem"
        }}
      />

      <Typography variant="h2" component="h2" gutterBottom>
        Success!
      </Typography>

      <Typography variant="subtitle1">
        Your order number is {data.orderId}.
      </Typography>

      <Typography variant="subtitle1">
        We have emailed your order confirmation,
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        and will send you an update when the order has shipped.
      </Typography>

      <Link href="/" as="/" passHref>
        <Fab component="a" variant="extended" color="primary">
          Back to Shop
        </Fab>
      </Link>
    </Grid>
  );
}
