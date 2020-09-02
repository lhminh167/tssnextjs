import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { transitionWidth } from '../layout/layout.theme';
import DesktopNavbarComponent from './desktop-navbar.component';
import MobileNavbarComponent from './mobile-navbar.component';

const NavbarComponent = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up(transitionWidth));

    return matches ?
        <DesktopNavbarComponent /> :
        <MobileNavbarComponent />;
}

export default NavbarComponent;