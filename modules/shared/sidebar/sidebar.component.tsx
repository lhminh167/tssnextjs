import Drawer from '@mui/material/Drawer';
import React from 'react';
import SideBarContentComponent from './sidebar-content.component';


interface IProps {
    open: boolean;
    onClose: any;
}

export default function SideBarComponent(props: IProps) {
    const { open, onClose } = props;

    const close = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            (
                (event as React.KeyboardEvent).key === 'Tab'
                || (event as React.KeyboardEvent).key === 'Shift'
            )
        ) return;

        onClose();
    };

    return (
        <Drawer
            open={open}
            onClose={close}
        >
            <SideBarContentComponent
                onClose={close}
            />
        </Drawer>
    );
}
