import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Breadcrumbs,
  Button,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { bold, mb, p } from "../../shared/layout/layout.style";
import {
  ADDRESS_1,
  ADDRESS_2,
  CITY,
  COUNTRY,
  DAY_PHONE,
  EDIT,
  EMAIL,
  EVE_PHONE,
  MOB_PHONE,
  NAME,
  POSTALCODE,
  REGION,
  ROLE,
  SHIPPING_REGION,
} from "../../shared/tag/tag.model";
import { Customer, customerUrl, defaultCustomer } from "../customer.model";
import { getCustomer } from "../customer.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: bold,
    p: p,
    mb: mb,
  })
);
interface Props {
  userId: number;
}

export default function CustomerDetailComponent({ userId }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<Customer>(defaultCustomer);

  useEffect(() => {
    if (userId > 0)
      getCustomer(userId).then((data) => {
        setState(data.content);
      });
  }, [userId]);

  return (
    <Fragment>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        className={classes.mb}
      >
        <Link href="/" passHref>
          <Typography component="a" color="inherit">
            Home
          </Typography>
        </Link>
        <Link href={customerUrl.baseUrl} passHref>
          <Typography component="a" color="inherit">
            Customer
          </Typography>
        </Link>
        <Typography color="textPrimary">Customer Details</Typography>
      </Breadcrumbs>
      <Grid container xs={12} component={Paper} className={classes.p}>
        <Grid item xs={12} className={classes.mb}>
          <Typography component="h1" variant="h5">
            Customer Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Full Name</Typography>
          <Typography data-cy={NAME}>{state.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Email Address</Typography>
          <Typography data-cy={EMAIL}>{state.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Mobile Phone Number</Typography>
          <Typography data-cy={MOB_PHONE}>{state.mobPhone}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Evening Phone Number</Typography>
          <Typography data-cy={EVE_PHONE}>{state.evePhone}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Day Phone Number</Typography>
          <Typography data-cy={DAY_PHONE}>{state.dayPhone}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Address Line 1</Typography>
          <Typography data-cy={ADDRESS_1}>{state.address1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.bold}>Address Line 2</Typography>
          <Typography data-cy={ADDRESS_2}>{state.address2}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>City</Typography>
          <Typography data-cy={CITY}>{state.city}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Region</Typography>
          <Typography data-cy={REGION}>{state.region}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Country</Typography>
          <Typography data-cy={COUNTRY}>{state.country}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Postal Code</Typography>
          <Typography data-cy={POSTALCODE}>{state.postalCode}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Shipping Region</Typography>
          <Typography data-cy={SHIPPING_REGION}>
            {state.shippingRegion.shippingRegion1}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.mb}>
          <Typography className={classes.bold}>Role</Typography>
          <Typography data-cy={ROLE}>{state.role}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link
            href={{
              pathname: "/user/[userId]/edit",
            }}
            as={`/user/${userId}/edit`}
            passHref
          >
            <Button
              component="a"
              fullWidth
              variant="contained"
              color="primary"
              data-cy={EDIT}
            >
              Edit
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
}
