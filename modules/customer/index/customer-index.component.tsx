import { ListItemIcon, Paper, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import { getCustomerIdNumberFromLoginToken, toNumber } from '../../shared/helpers/auth.helper';
import { DETAIL, EDIT, NEW_PASSWORD } from '../../shared/tag/tag.model';

export default function CustomerIndexComponent(props) {
    const userId = getCustomerIdNumberFromLoginToken();

    return (
        <Fragment>
            <Typography
                component='h1'
                variant='h6'
                gutterBottom
            >
                User Area
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
                        component='a'
                        data-cy={DETAIL}
                    >
                        <ListItemIcon>
                            <VisibilityIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary='View Account'
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
                        component='a'
                        data-cy={EDIT}
                    >
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary='Edit Account'
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
                        component='a'
                        data-cy={NEW_PASSWORD}
                    >
                        <ListItemIcon>
                            <LockOutlinedIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary='Change Password'
                        />
                    </ListItem>
                </Link>
            </List>

        </Fragment>

    );
}
