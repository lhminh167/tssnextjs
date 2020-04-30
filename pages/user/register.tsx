import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import RegisterComponent from '../../modules/customer/create/create-customer.component';
import { getCustomerIdNumberFromStore, redirect } from '../../modules/shared/helpers/auth.helper';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

function RegisterPage(props) {
    const classes = useStyles(props);

    return (
        <ErrorBoundary>
            <RegisterComponent />
        </ErrorBoundary>
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
