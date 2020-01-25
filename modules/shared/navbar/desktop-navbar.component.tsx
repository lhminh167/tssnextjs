import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Link from "next/link";
import React, { Fragment } from "react";
import { transitionWidth } from "../layout/layout.theme";
import SearchComponent from "../search/search.component";
import BrandComponent from "../brand/brand.component";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { IRootState } from "../../root/root.model";
import { getCustomerId } from "../helpers/auth.helper";
import { currentUser } from "../../customer/customer.slice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up(transitionWidth)]: {
        display: "flex"
      }
    },
    grow: {
      flexGrow: 1
    },
    seperator: {
      marginLeft: theme.spacing(2)
    }
  })
);

const NotLoggedInComponent = () => {
  const classes = useStyles({});
  return (
    <Fragment>
      <Link href="/user/login" as="/user/login" passHref>
        <Typography
          variant="subtitle2"
          component="a"
          color="primary"
          className={classes.seperator}
        >
          Login
        </Typography>
      </Link>
      <Link href="/user/register" as="/user/register" passHref>
        <Typography
          variant="subtitle2"
          component="a"
          color="primary"
          className={classes.seperator}
        >
          Register
        </Typography>
      </Link>
    </Fragment>
  );
};

const LoggedInComponent = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  function logout() {
    dispatch(currentUser.actions.logout());
  }

  return (
    <Fragment>
      <Link href="/user" as="/user" passHref>
        <Typography
          variant="subtitle2"
          component="a"
          color="primary"
          className={classes.seperator}
        >
          Account
        </Typography>
      </Link>
      <Typography
        variant="subtitle2"
        component="a"
        color="primary"
        className={classes.seperator}
        onClick={logout}
      >
        Logout
      </Typography>
    </Fragment>
  );
};

const DesktopNavbarComponent = () => {
  const classes = useStyles({});
  const customerId = useSelector<IRootState, boolean>(
    state => getCustomerId(state.currentUser.data.customerId) > 0
  );
  const itemCount = useSelector<IRootState, number>(
    state => state.shoppingCartItemCount.data
  );
  // const isLoggedIn: boolean = false

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, [count]); // Only re-run the effect if count changes
  return (
    <Fragment>
      <AppBar className={classes.sectionDesktop} color="default">
        <Toolbar>
          <BrandComponent />
          <Link href="/department" as="/department" passHref>
            <Typography
              variant="subtitle2"
              component="a"
              color="primary"
              className={classes.seperator}
            >
              Departments
            </Typography>
          </Link>
          <Link href="/order" as="/order" passHref>
            <Typography
              variant="subtitle2"
              component="a"
              color="primary"
              className={classes.seperator}
            >
              Orders
            </Typography>
          </Link>
          <Link href="/wishlist" as="/wishlist" passHref>
            <Typography
              variant="subtitle2"
              component="a"
              color="primary"
              className={classes.seperator}
            >
              Wishlist
            </Typography>
          </Link>
          {customerId ? <LoggedInComponent /> : <NotLoggedInComponent />}
          <div className={classes.grow} />
          <SearchComponent className={""} fullWidth={false} />
          <Link href="/shopping-cart" as="/shopping-cart" passHref>
            <IconButton
              component="a"
              color="primary"
              className={classes.seperator}
            >
              <Badge badgeContent={itemCount > 0 ? itemCount : 0}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default DesktopNavbarComponent;
