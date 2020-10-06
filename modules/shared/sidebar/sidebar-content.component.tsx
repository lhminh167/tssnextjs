import { Avatar, Badge, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSlice } from '../../customer/customer.slice';
import { IRootState } from '../../root/root.model';
import { toNumber } from '../helpers/auth.helper';
import { SHOPPING_CART, TOTAL_QUANTITY, REGISTER, LOGIN, DEPARTMENT, ORDER, ADMIN, LOGOUT, WISHLIST, HOMEPAGE, USER, SEARCH } from '../tag/tag.model';

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
    const userEmail = useSelector<IRootState, string>(
        state => state.currentUser.data.email
    );
    const userName = useSelector<IRootState, string>(
        state => state.currentUser.data.name
    );
    const isLoggedIn = useSelector<IRootState, boolean>(
        state => toNumber(state.currentUser.data.customerId) > 0
    );
    const itemCount = useSelector<IRootState, number>(
        state => state.shoppingCartItemCount.data
    );
    const isAdmin = useSelector<IRootState, boolean>(
        state => state.currentUser.data.role === 'Admin'
    );

    function logout() {
        dispatch(currentUserSlice.actions.logout());
    }

    return (
        <List
            className={classes.list}
            component='nav'
            disablePadding
        >
            {
                !isLoggedIn &&
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
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                spacing={1}
                            >
                                <Link
                                    href='/user/login'
                                    as='/user/login'
                                    passHref
                                >
                                    <Grid item
                                        component={MuiLink}
                                        color='inherit'
                                        data-cy={LOGIN}
                                    >
                                        Login
                                </Grid>
                                </Link>
                                <Grid item
                                >
                                    |
                                    </Grid>
                                <Link
                                    href='/user/register'
                                    as='/user/register'
                                    passHref
                                >
                                    <Grid item
                                        component={MuiLink}
                                        color='inherit'
                                        data-cy={REGISTER}
                                    >
                                        Register
                                        </Grid>
                                </Link>
                            </Grid>
                        }
                    >
                    </ListItemText>
                </ListItem>
            }
            {
                isLoggedIn &&
                <Link
                    href={{
                        pathname: '/user'
                    }}
                    as={`/user`}
                    passHref
                >
                    <ListItem button component='a'
                        className={classes.user}
                        data-cy={USER}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {userName[0]}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Grid item
                                    component={MuiLink}
                                    color='inherit'
                                >
                                    {userName}
                                </Grid>

                            }
                            secondary={
                                <Grid item
                                    component={MuiLink}
                                    color='inherit'
                                >
                                    {userEmail}
                                </Grid>
                            }
                        >
                        </ListItemText>
                    </ListItem>
                </Link>
            }
            <Link
                href='/shopping-cart'
                as='/shopping-cart'
                passHref
            >
                <ListItem button component='a'
                    className={classes.firstListItem}
                    data-cy={SHOPPING_CART}
                >
                    <ListItemIcon
                    >
                        <Badge
                            badgeContent={itemCount ?? 0}
                            color='primary'
                            data-cy={TOTAL_QUANTITY}
                        >
                            <ShoppingCartOutlinedIcon
                                color='primary'
                            />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText
                        primary='Shopping Cart'
                        primaryTypographyProps={{
                            color: 'primary'
                        }}
                    />
                </ListItem>
            </Link>
            <Link
                href='/'
                as='/'
                passHref
            >
                <ListItem button component='a'
                    data-cy={HOMEPAGE}
                >
                    <ListItemIcon>
                        <HomeIcon
                            color='primary'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary='Home'
                        primaryTypographyProps={{
                            color: 'primary'
                        }}
                    />
                </ListItem>
            </Link>
            <Link
                href='/product'
                as='/product'
                passHref
            >
                <ListItem button component='a'
                    data-cy={SEARCH}
                >
                    <ListItemIcon>
                        <SearchIcon
                            color='primary'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary='Search'
                        primaryTypographyProps={{
                            color: 'primary'
                        }}
                    />
                </ListItem>
            </Link>
            <Link
                href='/wish-list'
                as='/wish-list'
                passHref
            >
                <ListItem button component='a'
                >
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary='Wishlist'
                        data-cy={WISHLIST}
                    />
                </ListItem>
            </Link>
            {
                isLoggedIn &&
                <Link
                    href='/order'
                    as='/order'
                    passHref
                >
                    <ListItem button component='a'
                    >
                        <ListItemIcon>
                            <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText primary='Orders'
                            data-cy={ORDER}
                        />
                    </ListItem>
                </Link>
            }
            {
                isAdmin && isLoggedIn &&
                <Link
                    href='/admin'
                    as='/admin'
                    passHref
                >
                    <ListItem button component='a'
                    >
                        <ListItemIcon>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText primary='Admin'
                            data-cy={ADMIN}
                        />
                    </ListItem>
                </Link>
            }
            <Link
                href='/department'
                as='/department'
                passHref
            >
                <ListItem button component='a'
                >
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Department'
                        data-cy={DEPARTMENT}
                    />
                </ListItem>
            </Link>
            {
                isLoggedIn &&
                <ListItem button
                    onClick={logout}
                    data-cy={LOGOUT}
                >
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout'

                    />
                </ListItem>
            }
        </List>
    );
}
