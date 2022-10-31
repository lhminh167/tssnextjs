import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Link from "next/link";
import { mb, mb2 } from "../../../shared/layout/layout.style";
import { RocketIcon } from "../../../shared/svg/svg.component";
import { BACK, ID } from "../../../shared/tag/tag.model";
import { Order } from "../../order.model";

const useStyles = makeStyles((theme) =>
  createStyles({
    mb2: mb2,
    mb: mb,
  })
);

interface Props {
  back: any;
  data: Order;
}

export default function FinishFormComponent({ back, data }: Props) {
  const classes = useStyles({});

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <RocketIcon
          color="primary"
          style={{
            fontSize: "16rem",
          }}
        />
      </Grid>
      <Grid item className={classes.mb}>
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
          Your order number is{" "}
          <Typography data-cy={ID} component="span">
            {data.orderId}
          </Typography>
          .
        </Typography>
        <Typography variant="subtitle1">
          We have emailed your order confirmation,
        </Typography>
        <Typography variant="subtitle1">
          and will send you an update when your order has shipped.
        </Typography>
      </Grid>
      <Grid item className={classes.mb2}>
        <Link href="/" as="/" passHref>
          <Fab component="a" variant="extended" color="primary" data-cy={BACK}>
            Back to Shop
          </Fab>
        </Link>
      </Grid>
    </Grid>
  );
}
