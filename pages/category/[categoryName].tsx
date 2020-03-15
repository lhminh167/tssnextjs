import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import OrderDetailComponent from '../../modules/order/detail/order-detail.component';
import { getCustomerIdNumberFromStore, redirect } from '../../modules/shared/helpers/auth.helper';

const useStyles = makeStyles({
});

export default function OrderDetailPage() {
    const classes = useStyles({});
    return (
        <OrderDetailComponent />
    );
}

OrderDetailPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    if (isServer) return;
    const customerId = getCustomerIdNumberFromStore(store);
    if (customerId <= 0) {
        redirect(ctx, '/user/login');
        return;
    }
}
