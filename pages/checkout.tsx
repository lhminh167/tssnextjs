import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckoutComponent from '../modules/checkout/checkout.component';
import { redirect, getCustomerIdFromStore } from '../modules/shared/helpers/auth.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

function CheckoutPage(
) {
    const classes = useStyles({});
    return (
        <CheckoutComponent />
    );
}

CheckoutPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    if (
        !isServer &&
        getCustomerIdFromStore(store) <= 0
    )
        redirect(ctx, '/user/login');
}

export default CheckoutPage;