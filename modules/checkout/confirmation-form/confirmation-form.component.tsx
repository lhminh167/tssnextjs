import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IShopingCartItem } from "../../shopping-cart/shopping-cart.model";
import { useSelector } from "react-redux";
import { IRootState } from "../../root/root.model";
import ActionButtonsComponent from "../shared/action-buttons.component";
import Button from "@material-ui/core/Button";
import { stockOk, shipOk } from "../checkout.service";

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA"
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" }
];

const useStyles = makeStyles(theme =>
  createStyles({
    listItem: {
      padding: theme.spacing(1, 0)
    },
    total: {
      fontWeight: 700
    },
    title: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  next: any;
  back: any;
}

export default function OrderConfirmationComponent({ next, back }: Props) {
  const classes = useStyles({});
  const data: IShopingCartItem[] = useSelector(
    (state: IRootState) => state.shoppingCart.data
  );
  const handleStockOk = () => {
    stockOk(19).then(data => {
      debugger;
    });
  };

  const handleShipOk = () => {
    shipOk(19).then(data => {
      debugger;
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {data.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.name} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleStockOk}>stockok</Button>
          <Button onClick={handleShipOk}>shipok</Button>
        </Grid>
        <Grid item xs={12}>
          <ActionButtonsComponent
            backButtonText={"Back"}
            nextButtonText={"Next Step"}
            back={back}
            next={next}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
