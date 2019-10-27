import React from 'react';
import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// import SignInModal from '../../user/sign-in/sign-in';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        toolBar: {
            [theme.breakpoints.down('sm')]: {
                paddingLeft: theme.spacing(0),
                paddingRight: theme.spacing(0),
            },
        },
        menuButton: {
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(0),
            },
            [theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(2),
            },
        },
        title: {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                textAlign: 'center',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
                display: 'block',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

function Navbar() {
    const classes = useStyles({});
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const upperAppBar = (
        <AppBar position="static" color="default">
            <Toolbar
                className={classes.toolBar}
                variant="dense"
            >
                <Typography className={classes.title} variant="subtitle2" noWrap>
                    Hi! Sign in or Register
                </Typography>

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4}>
                            <ShoppingCartOutlinedIcon color="action" />
                        </Badge>
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );

    const lowerAppBar = (
        <AppBar position="static">
            <Toolbar
                className={classes.toolBar}
            >
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Link href="/" as="/">
                    <Typography className={classes.title} variant="h6" noWrap>
                        SHOPMATE
                    </Typography>
                </Link>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <Link href="/shopping-cart" as="/shopping-cart">
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="primary">
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                        <MoreIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );

    return (
        <div className={classes.grow}>
            {upperAppBar}
            {lowerAppBar}
            {renderMenu}
            {renderMobileMenu}
        </div>
    );
}

export default Navbar;