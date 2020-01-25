import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { currentUser, currentUserInitialData } from '../modules/customer/customer.slice'
import createStore, { TssStore } from '../modules/root/root.store'
import { decodeLoginToken, setTokenHeader, getLoginToken } from '../modules/shared/helpers/token.helper'
import Layout from '../modules/shared/layout/layout.component'
import theme from '../modules/shared/layout/layout.theme'
import { getTotalQuantity } from '../modules/shopping-cart/shopping-cart.service'
import { Response } from '../modules/shared/crud/crud.model'
import { shoppingCartItemCountSlice } from '../modules/shopping-cart/shopping-cart.slice'
import { getCustomerIdFromLoginToken } from '../modules/shared/helpers/auth.helper'

interface IProps {
    store: TssStore;
}

class MyApp extends App<IProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps }
    }

    componentDidMount() {
        this.getCurrentUser();

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);
    }

    getCurrentUser() {
        const { store } = this.props;

        if (!getLoginToken()) return;
        console.log(getLoginToken())
        store.dispatch(shoppingCartItemCountSlice.actions.getTotalQuantityPending());

        const customerId = getCustomerIdFromLoginToken();
        customerId
            ? store.dispatch(currentUser.actions.getCustomerPending(customerId))
            : store.dispatch(currentUser.actions.setCurrentUser(decodeLoginToken()));;
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <ThemeProvider theme={theme}>

                <CssBaseline />
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ThemeProvider>

        )
    }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
