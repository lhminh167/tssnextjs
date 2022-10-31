import RefreshIcon from "@mui/icons-material/Refresh";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import QuantityPickerComponent from "../../shared/quantity-picker/quantity-picker.component";
import { UPDATE_QUANTITY } from "../../shared/tag/tag.model";
import { IShopingCartItem } from "../shopping-cart.model";
import { updateShoppingCartItem } from "../shopping-cart.service";
import { shoppingCartItemCountSlice } from "../shopping-cart.slice";

interface IProps {
  data: IShopingCartItem;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      flexDirection: "row",
      width: 240,
    },
  })
);

function ShoppingCartQuantityPickerComponent({ data }: IProps) {
  const classes = useStyles({});
  const [state, setState] = useState(data.quantity);
  const dispatch = useDispatch();

  async function updateItem() {
    await updateShoppingCartItem({ ...data, quantity: state });
    if (data.buyNow)
      dispatch(shoppingCartItemCountSlice.actions.getTotalQuantityPending());
  }

  return (
    <Grid
      container
      spacing={2}
      // direction='row'
      className={classes.row}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <QuantityPickerComponent quantity={state} output={setState} />
      </Grid>
      <Grid item>
        <Tooltip title="Save quantity">
          <Fab
            color="primary"
            onClick={updateItem}
            size="small"
            data-cy={UPDATE_QUANTITY}
          >
            <RefreshIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default ShoppingCartQuantityPickerComponent;
