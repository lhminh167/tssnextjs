import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import SearchComponent from '../search/search.component';
import SideBarComponent from '../sidebar/sidebar.component';
import { transitionWidth } from '../layout/layout.theme';
import BrandComponent from '../brand/brand.component';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up(transitionWidth)]: {
                display: 'none',
            },
        },
        grow: {
            flexGrow: 1,
        },
    })
);

const MobileNavbarComponent = () => {
    const classes = useStyles({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen: boolean) => () => {
        setIsSidebarOpen(isOpen);
    };

    const trigger = useScrollTrigger({
        // target: window ? window : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Fragment>
            <AppBar
                className={classes.sectionMobile}
                color="default"
            >
                <Toolbar
                >
                    <IconButton
                        onClick={toggleSidebar(true)}
                        color="primary"
                        edge="start"
                    >
                        <ArrowBackIcon
                        />
                    </IconButton>

                    <div className={classes.grow} />

                    {!trigger &&
                        <BrandComponent className={''} />
                    }

                    {trigger &&
                        <SearchComponent
                            className={''}
                            fullWidth={true}
                        />
                    }

                    <div className={classes.grow} />

                    <IconButton
                        onClick={toggleSidebar(true)}
                        color="primary"
                        edge="end"
                    >
                        <MenuIcon
                        />
                    </IconButton>
                </Toolbar>
                {!trigger &&
                    <Toolbar>
                        <SearchComponent
                            className={''}
                            fullWidth={true}
                        />
                    </Toolbar>
                }
            </AppBar>
            <SideBarComponent open={isSidebarOpen} onClose={toggleSidebar(false)} />
        </Fragment>
    );
}

export default MobileNavbarComponent;