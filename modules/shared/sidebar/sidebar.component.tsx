import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SideBarContentComponent from './sidebar-content.component';

const useStyles = makeStyles({
});

interface IProps {
    open: boolean;
    onClose: any;
}

export default function SideBarComponent(props: IProps) {
    const { open, onClose } = props;
    const classes = useStyles({});

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
