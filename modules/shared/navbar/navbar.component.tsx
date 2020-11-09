import React from 'react';
import { isMediumWidth } from '../layout/layout.theme';
import DesktopNavbarComponent from './desktop-navbar.component';
import MobileNavbarComponent from './mobile-navbar.component';

const NavbarComponent = () => {
    const matches = isMediumWidth();

    return matches ?
        <DesktopNavbarComponent /> :
        <MobileNavbarComponent />;
}

export default NavbarComponent;