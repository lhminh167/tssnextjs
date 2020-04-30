import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import LoginComponent from '../../modules/customer/login/login.component';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function LoginPage(props) {
    const classes = useStyles(props);

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
