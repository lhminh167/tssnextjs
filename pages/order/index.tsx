import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrderListComponent from '../../modules/order/list/order-list.component';
import { Order } from '../../modules/order/order.model';
import { shoppingCartSlice } from '../../modules/shopping-cart/shopping-cart.slice';
import { redirect, getCustomerIdNumberFromStore } from '../../modules/shared/helpers/auth.helper';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

export default function OrderListPage() {
    const classes = useStyles({});
    return (
        <OrderListComponent />
    );
}

OrderListPage.getInitialProps = async function ({
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
