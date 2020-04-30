import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Link from "next/link";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSlice } from "../../customer/customer.slice";
import { IRootState } from "../../root/root.model";
import BrandComponent from "../brand/brand.component";
import { toNumber, getRole } from "../helpers/auth.helper";
import { transitionWidth } from "../layout/layout.theme";
import SearchComponent from "../search/search.component";

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
    const isAdmin = useSelector<IRootState, boolean>(
        state => getRole(state.currentUser.data) === "Admin"
    );
    function logout() {
        dispatch(currentUserSlice.actions.logout());
    }

    return (
        <Fragment>
            {
                isAdmin &&
                <Link href="/admin" as="/admin" passHref>
                    <Typography
                        variant="subtitle2"
                        component="a"
                        color="primary"
                        className={classes.seperator}
                    >
                        Admin
                    </Typography>
                </Link>
            }
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
            <Link href="/wish-list" as="/wish-list" passHref>
                <Typography
                    variant="subtitle2"
                    component="a"
                    color="primary"
                    className={classes.seperator}
                >
                    Wishlist
            </Typography>
            </Link>
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

export default function DesktopNavbarComponent() {
    const classes = useStyles({});
    const isLoggedIn = useSelector<IRootState, boolean>(
        state => toNumber(state.currentUser.data.customerId) > 0
    );
    const itemCount = useSelector<IRootState, number>(
        state => state.shoppingCartItemCount.data
    );
    return (
        <AppBar className={classes.sectionDesktop} color="default">
            <Toolbar>
                <BrandComponent />
                <Link href="/product" as="/product" passHref>
                    <Typography
                        variant="subtitle2"
                        component="a"
                        color="primary"
                        className={classes.seperator}
                    >
                        Search
                    </Typography>
                </Link>
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
                {isLoggedIn ? <LoggedInComponent /> : <NotLoggedInComponent />}
                <div className={classes.grow} />
                <SearchComponent className={""} fullWidth={false} />
                <Link
                    href="/shopping-cart"
                    as="/shopping-cart"
                    passHref
                >
                    <IconButton
                        component="a"
                        className={classes.seperator}
                    >
                        <Badge
                            badgeContent={itemCount ?? 0}
                            color="primary"
                        >
                            <ShoppingCartOutlinedIcon
                                color="primary"
                            />
                        </Badge>
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
};
