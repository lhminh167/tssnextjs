import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import CustomerEditComponent from '../../../modules/customer/edit/edit-customer.component';
import { redirect, toNumber } from '../../../modules/shared/helpers/auth.helper';
import ErrorBoundary from '../../../modules/shared/error-boundary/error-boundary.component';
import { mb, mt } from '../../../modules/shared/layout/layout.style';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        mt: mt
    }),
);

interface Props {
    userId: number;
}

export default function CustomerEditPage({
    userId
}: Props) {

    const classes = useStyles({});
    return (
        <Container
            className={classes.mb + ' ' + classes.mt}
        >
            <ErrorBoundary>
                <CustomerEditComponent
                    userId={userId}
                />
            </ErrorBoundary>
        </Container>
    );
}

CustomerEditPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query
    },
    ctx
}) {
    const userId = toNumber(query.userId);
    // const currentUser = store.getState().currentUser.data;
    // const currentUserId = toNumber(currentUser.customerId);

    // const isNotLoggedIn = !isServer && currentUserId === 0;
    // const isNotAdminAccessingOtherUser = !isServer && currentUser.role !== 'Admin' && userId !== currentUserId;
    // if (isNotLoggedIn || isNotAdminAccessingOtherUser) redirect(ctx, ctx.req.originalUrl);

    return {
        userId
    };
}
