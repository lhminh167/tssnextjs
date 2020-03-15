import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import RegisterComponent from '../../modules/customer/create/create-customer.component';
import { getCustomerIdNumberFromStore, redirect } from '../../modules/shared/helpers/auth.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        gridList: {
        },
        icon: {
        },
    }),
);

function RegisterPage(props) {
    const classes = useStyles(props);
    // const data = useSelector(
    //     (state: IRootState) => state.Register.data
    // )

    return (
        <RegisterComponent />
    );
}

RegisterPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    if (
        !isServer &&
        getCustomerIdNumberFromStore(store) > 0
    )
        redirect(ctx, ctx.req.originalUrl);
}

export default RegisterPage
