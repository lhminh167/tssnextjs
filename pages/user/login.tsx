import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginComponent from '../../modules/customer/login/login.component';
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

function LoginPage(props) {
    const classes = useStyles(props);
    // const data = useSelector(
    //     (state: IRootState) => state.Login.data
    // )

    return (
        <LoginComponent />
    );
}

LoginPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    // if (
    //     !isServer &&
    //     getCustomerIdNumberFromStore(store) > 0
    // ) {
    //     redirect(ctx, ctx.req.originalUrl);
    //     return
    // }
}

export default LoginPage
