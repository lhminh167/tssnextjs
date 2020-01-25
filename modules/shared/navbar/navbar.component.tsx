import React, { Fragment } from 'react';
import DesktopNavbarComponent from './desktop-navbar.component';
import MobileNavbarComponent from './mobile-navbar.component';

const NavbarComponent = () => {

    return (
        <Fragment>
            <MobileNavbarComponent/>
            <DesktopNavbarComponent/>
        </Fragment>
    );
}

export default NavbarComponent;