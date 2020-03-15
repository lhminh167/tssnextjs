import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ListItemIcon } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from 'next/link';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function AdminListComponent(props) {
    const classes = useStyles(props);
    return (
        <List
            component="nav"
        >
            <Link
                href="/product/new"
                passHref
            >
                <ListItem
                    button
                    component="a"
                >
                    <ListItemIcon>
                        <AddCircleIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Add new product"
                    />
                </ListItem>
            </Link>
        </List>
    );
}
