import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { RocketIcon } from "../../../shared/svg/svg.component";
import { Order } from "../../order.model";
import { makeStyles, createStyles } from "@material-ui/core";
import { mb2, mb } from "../../../shared/layout/layout.style";

const useStyles = makeStyles(theme =>
  createStyles({
    mb2: mb2,
    mb: mb
  })
);

interface Props {
  back: any;
  data: Order;
}

export default function FinishFormComponent({ back, data }: Props) {
  const classes = useStyles({});

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
    >
      <Grid
        item
      >
        <RocketIcon
          color="primary"
          style={{
            fontSize: "16rem"
          }}
        />
      </Grid>
      <Grid
        item
        className={classes.mb}
      >
        <Typography variant="h2" component="h2">
          Success!
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        className={classes.mb2}
      >
        <Typography variant="subtitle1">
          Your order number is {data.orderId}.
        </Typography>
        <Typography variant="subtitle1">
          We have emailed your order confirmation,
        </Typography>
        <Typography variant="subtitle1">
          and will send you an update when your order has shipped.
        </Typography>
      </Grid>
      <Grid
        item
        className={classes.mb2}
      >
        <Link href="/" as="/" passHref>
          <Fab component="a" variant="extended" color="primary"
          >
            Back to Shop
          </Fab>
        </Link>
      </Grid>
    </Grid>
  );
}
