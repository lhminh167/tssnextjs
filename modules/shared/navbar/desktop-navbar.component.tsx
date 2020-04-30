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
import { toNumber } from "../helpers/auth.helper";
import { transitionWidth, themeColor } from "../layout/layout.theme";
import SearchComponent from "../search/search.component";
import { Avatar, Popover, List, ListItem, ListItemText, Tooltip, ListItemSecondaryAction, ListSubheader } from "@material-ui/core";
import { Customer } from "../../customer/customer.model";

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
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            background: themeColor.primary
        },
        tooltip: {
            minWidth: '300px',
        },

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
        state => state.currentUser.data.role === "Admin"
    );
    const userId = useSelector<IRootState, number>(
        state => toNumber(state.currentUser.data.customerId)
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
    const currentUser = useSelector<IRootState, Customer>(
        state => state.currentUser.data
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
                {
                    isLoggedIn &&
                    <Link
                        href={{
                            pathname: '/user'
                        }}
                        as={`/user`}
                        passHref
                    >
                        <IconButton
                            component="a"
                            className={classes.seperator}
                        >
                            <Tooltip
                                classes={{ tooltip: classes.tooltip }}
                                title={
                                    <Fragment>
                                        <List
                                            subheader={
                                                <ListSubheader
                                                    color='primary'
                                                >
                                                    Account Details
                                                </ListSubheader>
                                            }
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Name:"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography
                                                    >
                                                        {currentUser.name}
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Email:"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography
                                                    >
                                                        {currentUser.email}
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText
                                                    primary="Role:"
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography
                                                    >
                                                        {currentUser.role}
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Fragment>
                                }
                            >
                                <Avatar
                                    className={classes.avatar}
                                >
                                    {currentUser.name[0]}
                                </Avatar>
                            </Tooltip>
                        </IconButton>
                    </Link>
                }
            </Toolbar>
        </AppBar>
    );
};
