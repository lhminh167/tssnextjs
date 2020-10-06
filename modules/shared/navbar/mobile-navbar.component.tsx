import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useState } from 'react';
import BrandComponent from '../brand/brand.component';
import SearchComponent from '../search/search.component';
import SideBarComponent from '../sidebar/sidebar.component';
import { useRouter } from 'next/router';
// import LazyHydrate from "react-lazy-hydration";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionMobile: {
            display: 'flex',
        },
        grow: {
            flexGrow: 1,
        },
    })
);

const MobileNavbarComponent = () => {
    const classes = useStyles({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = (isOpen: boolean) => () => {
        setIsSidebarOpen(isOpen);
    };

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Fragment>
            <AppBar
                className={classes.sectionMobile}
                color='default'
            >
                <Toolbar
                >
                    <IconButton
                        onClick={() => { router.back() }}
                        color='primary'
                        edge='start'
                    >
                        <ArrowBackIcon
                        />
                    </IconButton>

                    <div className={classes.grow} />

                    {
                        !trigger &&
                        <BrandComponent className={''} />
                    }

                    {
                        trigger &&
                        <SearchComponent
                            className={''}
                            fullWidth={true}
                        />
                    }

                    <div className={classes.grow} />
                    <IconButton
                        onClick={toggleSidebar(true)}
                        color='primary'
                        edge='end'
                    >
                        <MenuIcon
                        />
                    </IconButton>
                </Toolbar>
                {
                    !trigger &&
                    <Toolbar>
                        <SearchComponent
                            className={''}
                            fullWidth={true}
                        />
                    </Toolbar>
                }
            </AppBar>
            {/* <LazyHydrate whenVisible> */}
            <SideBarComponent open={isSidebarOpen} onClose={toggleSidebar(false)} />
            {/* </LazyHydrate> */}
        </Fragment>
    );
}

export default MobileNavbarComponent;