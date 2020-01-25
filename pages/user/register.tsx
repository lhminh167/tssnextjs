import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import RegisterComponent from '../../modules/customer/register/register.component';

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

// RegisterPage.getInitialProps = function(props) {
//     const { store, isServer } = props.ctx;

//     if (
//         store.getState().Register.data.length === 0
//     ) {
//         store.dispatch(Register.actions.getCartPending());
//     }

//     return { isServer }
// }

export default RegisterPage
