import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SideBarContentComponent from './sidebar-content.component';

const useStyles = makeStyles({
    // list: {
    //     width: 250,
    // },
    // fullList: {
    //     width: 'auto',
    // },
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
            anchor="left"
            open={open}
            onClose={close}
        >
            {/* <div
                // className={classes.list}
                role="presentation"
                onClick={close}
                onKeyDown={close}
            > */}
            <SideBarContentComponent
                onClose={close} 
            />
            {/* </div> */}
        </Drawer>
    );
}