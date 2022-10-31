import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ActionButtonsComponent from "../../shared/action-buttons/action-buttons.component";
import { defaultRowsPerPageOptions } from "../../shared/crud/crud.model";
import { goTo, isAnonymous } from "../../shared/helpers/auth.helper";
import {
  decodeAttributes,
  getCartItemColor,
  getCartItemSize,
} from "../../shared/helpers/product.helper";
import ImageComponent from "../../shared/image/image.component";
import { bold, p } from "../../shared/layout/layout.style";
import { getDiscountedPrice } from "../../shared/models/product.model";
import PaginationComponent from "../../shared/pagination/pagination.component";
import {
  COLOR,
  COUNT,
  DISCOUNTED_PRICE,
  ITEM,
  NAME,
  REMOVE,
  SAVE_ITEM_FOR_LATER,
  SHOPPING_CART,
  SIZE,
  tag,
} from "../../shared/tag/tag.model";
import ShoppingCartQuantityPickerComponent from "../quantity-picker/shopping-cart-quantity-picker.component";
import {
  defaultShopingCartGetRequest,
  defaultShoppingCart,
  IShopingCart,
  IShopingCartItem,
  ShopingCartGetRequest,
} from "../shopping-cart.model";
import {
  getShoppingCart,
  removeShoppingCartItem,
  saveShoppingCartItemForLater,
} from "../shopping-cart.service";
import { shoppingCartItemCountSlice } from "../shopping-cart.slice";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    p: p,
    bold: bold,
  })
);

interface IProps {}

export default function ShoppingCartComponent({}: IProps) {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [choice, setChoice] = useState<ShopingCartGetRequest>(
    defaultShopingCartGetRequest
  );
  const [state, setState] = useState<IShopingCart>(defaultShoppingCart);

  useEffect(() => {
    getData(choice);
  }, []);

  async function getData(input: ShopingCartGetRequest) {
    if (!isAnonymous()) return;
    const response = await getShoppingCart(input);
    setState(response.content);
    setChoice(input);
  }

  async function changePageIndex(event, pageIndex: number) {
    await getData({
      ...choice,
      pageIndex,
    });
  }

  async function changePageSize(event) {
    await getData({
      ...choice,
      pageSize: parseInt(event.target.value, 10),
      pageIndex: defaultShopingCartGetRequest.pageIndex,
    });
  }

  async function removeItem(input: IShopingCartItem) {
    await removeShoppingCartItem(input);
    await getData(choice);
    dispatch(shoppingCartItemCountSlice.actions.add(-input.quantity));
  }

  async function saveItemForLater(input: IShopingCartItem) {
    await saveShoppingCartItemForLater(input);
    await getData(choice);
    dispatch(shoppingCartItemCountSlice.actions.add(-input.quantity));
  }

  function back() {
    goTo("/");
  }

  function checkout() {
    goTo("/order/new");
  }

  return (
    <Paper>
      <div className={classes.p}>
        <Typography variant="h6" component="h2">
          <Typography data-cy={COUNT} component="span" variant="h6">
            {state.totalQuantity}
          </Typography>
          {" Items In Your Cart"}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Item</TableCell>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.items?.map((row) => {
                const attributes = decodeAttributes(row.attributes);
                const color = getCartItemColor(attributes);
                const size = getCartItemSize(attributes);
                const price = getDiscountedPrice(row.product);

                return (
                  <TableRow
                    key={row.itemId}
                    data-cy={tag(ITEM, row.itemId, SHOPPING_CART)}
                    data-id={row.itemId}
                  >
                    <TableCell component="th" scope="row">
                      <ImageComponent
                        imageName={row.product.image}
                        imageStyles={{
                          width: 100,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          className={classes.bold}
                          component="span"
                          data-cy={COLOR}
                        >
                          {color}
                        </Typography>{" "}
                        <Typography
                          variant="body1"
                          className={classes.bold}
                          component="span"
                          data-cy={NAME}
                        >
                          {row.product.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} container direction="row">
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => saveItemForLater(row)}
                          startIcon={<BookmarkIcon fontSize="small" />}
                          data-cy={SAVE_ITEM_FOR_LATER}
                        >
                          Save for later
                        </Button>
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => removeItem(row)}
                          startIcon={<ClearRoundedIcon fontSize="small" />}
                          data-cy={REMOVE}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">
                      <Typography data-cy={SIZE}>{size}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <ShoppingCartQuantityPickerComponent data={row} />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        className={classes.bold}
                        data-cy={DISCOUNTED_PRICE}
                      >
                        {price}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={defaultRowsPerPageOptions}
          component="div"
          count={state.count}
          rowsPerPage={state.pageSize}
          page={state.pageIndex}
          onPageChange={changePageIndex}
          onRowsPerPageChange={changePageSize}
          ActionsComponent={PaginationComponent}
          labelRowsPerPage="Items per page:"
        />
      </div>
      <ActionButtonsComponent
        backButtonText={"Back to Shop"}
        nextButtonText={"Checkout"}
        back={back}
        next={checkout}
        nextButtonDisabled={state.count === 0}
      />
    </Paper>
  );
}
