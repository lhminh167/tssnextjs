import React from 'react';
import { isMobile } from '../layout/layout.theme';
import DesktopNavbarComponent from './desktop-navbar.component';
import MobileNavbarComponent from './mobile-navbar.component';

const NavbarComponent = () => {
    const matches = isMobile();

    return matches ?
        <DesktopNavbarComponent /> :
        <MobileNavbarComponent />;
}

export default NavbarComponent;