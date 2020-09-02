import { ListItemIcon, Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Link from 'next/link';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function AdminListComponent(props) {
    const classes = useStyles(props);
    return (
        <Fragment>
            <Typography
                component='h1'
                variant='h6'
                gutterBottom
            >
                Admin Area
            </Typography>
            <List
                component={Paper}
            >
                <Link
                    href='/product/new'
                    as='/product/new'
                    passHref
                >
                    <ListItem
                        button
                        component='a'
                    >
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary='Add new product'
                        />
                    </ListItem>
                </Link>
            </List>
        </Fragment>

    );
}
