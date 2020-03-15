import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { currentUser } from '../modules/customer/customer.slice'
import createStore, { TssStore } from '../modules/root/root.store'
import { getCustomerIdNumberFromLoginToken } from '../modules/shared/helpers/auth.helper'
import { decodeLoginToken, getLoginToken, getValidLoginToken } from '../modules/shared/helpers/token.helper'
import Layout from '../modules/shared/layout/layout.component'
import theme, { GlobalCss } from '../modules/shared/layout/layout.theme'
import { shoppingCartItemCountSlice } from '../modules/shopping-cart/shopping-cart.slice'

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
        if (!getValidLoginToken()) return;

        const { store } = this.props;

        store.dispatch(shoppingCartItemCountSlice.actions.getTotalQuantityPending());

        const customerId = getCustomerIdNumberFromLoginToken();
        customerId
            ? store.dispatch(currentUser.actions.getCustomerPending(customerId))
            : store.dispatch(currentUser.actions.setCurrentUser(decodeLoginToken()));;
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalCss />
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
