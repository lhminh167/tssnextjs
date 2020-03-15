import { Avatar, Badge, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../customer/customer.slice';
import { IRootState } from '../../root/root.model';
import { getRole, toNumber } from '../helpers/auth.helper';
import { toUrl } from '../helpers/string.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        user: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },
        firstListItem: {
            marginTop: '1rem'
        }
    })
);

interface ITreeViewProps {
    onClose: any;
}

export default function SideBarContentComponent(props: ITreeViewProps) {
    const classes = useStyles({});
    const dispatch = useDispatch();
    const { onClose } = props;
    const [open, setOpen] = React.useState(true);
    const userEmail = useSelector<IRootState, string>(
        state => state.currentUser.data.email
    );
    const userName = useSelector<IRootState, string>(
        state => state.currentUser.data.name
    );
    const userId = useSelector<IRootState, number>(
        state => toNumber(state.currentUser.data.customerId)
    );
    const isLoggedIn = useSelector<IRootState, boolean>(
        state => toNumber(state.currentUser.data.customerId) > 0
    );
    const itemCount = useSelector<IRootState, number>(
        state => state.shoppingCartItemCount.data
    );
    const isAdmin = useSelector<IRootState, boolean>(
        state => getRole(state.currentUser.data) === "Admin"
    );

    function logout() {
        dispatch(currentUser.actions.logout());
    }

    return (
        <List
            className={classes.list}
            component="nav"
            disablePadding
        >
            <ListItem
                button
                className={classes.user}
            >
                <ListItemAvatar>
                    <Avatar>
                        {userName[0]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Fragment>
                            {
                                isLoggedIn &&
                                <Link
                                    href={{
                                        pathname: 'user/[userId]',
                                        query: {
                                            userId
                                        }
                                    }}
                                    as={`product/${toUrl(userName)}?userId=${userId}`}
                                    passHref
                                >
                                    <Grid item
                                        component={MuiLink}
                                        color="inherit"
                                    >
                                        {userName}
                                    </Grid>
                                </Link>
                            }
                            {
                                !isLoggedIn &&
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Link
                                        href="/user/login"
                                        as="/user/login"
                                        passHref
                                    >
                                        <Grid item
                                            component={MuiLink}
                                            color="inherit"
                                        >
                                            Login
                                </Grid>
                                    </Link>
                                    <Grid item
                                    >
                                        |
                            </Grid>
                                    <Link
                                        href="/user/register"
                                        as="/user/register"
                                        passHref
                                    >
                                        <Grid item
                                            component={MuiLink}
                                            color="inherit"
                                        >
                                            Register
                            </Grid>
                                    </Link>
                                </Grid>
                            }
                        </Fragment>
                    }
                    secondary={
                        isLoggedIn &&
                        <Link
                            href={{
                                pathname: 'user/[userId]',
                                query: {
                                    userId
                                }
                            }}
                            as={`product/${toUrl(userName)}?userId=${userId}`}
                            passHref
                        >
                            <Grid item
                                component={MuiLink}
                                color="inherit"
                            >
                                {userEmail}
                            </Grid>
                        </Link>
                    }
                >
                </ListItemText>
            </ListItem>
            <Link
                href="/shopping-cart"
                as="/shopping-cart"
                passHref
            >
                <ListItem button component="a"
                    className={classes.firstListItem}
                >
                    <ListItemIcon
                    >
                        <Badge
                            badgeContent={itemCount ?? 0}
                            color="primary"
                        >
                            <ShoppingCartOutlinedIcon
                                color="primary"
                            />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText
                        primary="Shopping Cart"
                        primaryTypographyProps={{
                            color: 'primary'
                        }}
                    />
                </ListItem>
            </Link>
            <Link
                href="/"
                as="/"
                passHref
            >
                <ListItem button component="a"
                >
                    <ListItemIcon>
                        <HomeIcon
                            color="primary"
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Home"
                        primaryTypographyProps={{
                            color: 'primary'
                        }}
                    />
                </ListItem>
            </Link>
            <Link
                href="/wish-list"
                as="/wish-list"
                passHref
            >
                <ListItem button component="a"
                >
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" />
                </ListItem>
            </Link>
            {
                isLoggedIn &&
                <Link
                    href="/order"
                    as="/order"
                    passHref
                >
                    <ListItem button component="a"
                    >
                        <ListItemIcon>
                            <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText primary="Order" />
                    </ListItem>
                </Link>
            }
            {
                isAdmin && isLoggedIn &&
                <Link
                    href="/admin"
                    as="/admin"
                    passHref
                >
                    <ListItem button component="a"
                    >
                        <ListItemIcon>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItem>
                </Link>
            }
            <Link
                href="/department"
                as="/department"
                passHref
            >
                <ListItem button component="a"
                >
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Department" />
                </ListItem>
            </Link>
            {
                isLoggedIn &&
                <ListItem button
                    onClick={logout}
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            }
        </List>
    );
}
