import { ListItemIcon, Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import { toNumber } from '../../shared/helpers/auth.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function CustomerIndexComponent(props) {
    const classes = useStyles(props);
    const userId = useSelector<IRootState, number>(
        state => toNumber(state.currentUser.data.customerId)
    );

    return (
        <Fragment>
            <Typography
                component="h1"
                variant="h6"
                gutterBottom
            >
                Customer Area
            </Typography>
            <List
                component={Paper}
            >
                <Link
                    href={{
                        pathname: '/user/[userId]'
                    }}
                    as={`/user/${userId}`}
                    passHref
                >
                    <ListItem
                        button
                        component="a"
                    >
                        <ListItemIcon>
                            <VisibilityIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="View Account"
                        />
                    </ListItem>
                </Link>
                <Link
                    href={{
                        pathname: '/user/[userId]/edit'
                    }}
                    as={`/user/${userId}/edit`}
                    passHref
                >

                    <ListItem
                        button
                        component="a"
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Edit Account"
                        />
                    </ListItem>
                </Link>
                <Link
                    href={{
                        pathname: '/user/[userId]/change-password'
                    }}
                    as={`/user/${userId}/change-password`}
                    passHref
                >
                    <ListItem
                        button
                        component="a"
                    >
                        <ListItemIcon>
                            <LockOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary="Change Password"
                        />
                    </ListItem>
                </Link>
            </List>

        </Fragment>

    );
}
