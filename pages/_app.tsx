import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import * as Sentry from '@sentry/browser';
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { currentUserSlice } from "../modules/customer/customer.slice";
import createStore, { TssStore } from "../modules/root/root.store";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { getCustomerIdNumberFromLoginToken } from "../modules/shared/helpers/auth.helper";
import { decodeLoginToken, getValidLoginToken } from "../modules/shared/helpers/token.helper";
import Layout from "../modules/shared/layout/layout.component";
import theme, { GlobalCss } from "../modules/shared/layout/layout.theme";
import { shoppingCartItemCountSlice } from "../modules/shopping-cart/shopping-cart.slice";

interface IProps {
    store: TssStore;
}

class MyApp extends App<IProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps };
    }

    componentDidMount() {
        if (process.env.NODE_ENV !== 'production')
            Sentry.init({ dsn: "https://092f990227db4c81b121d898afcd93dc@sentry.io/5189172" });

        this.getCurrentUser();

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);
    }

    getCurrentUser() {
        if (!getValidLoginToken()) return;

        const { store } = this.props;

        store.dispatch(
            shoppingCartItemCountSlice.actions.getTotalQuantityPending()
        );

        const customerId = getCustomerIdNumberFromLoginToken();
        customerId
            ? store.dispatch(currentUserSlice.actions.getCustomerPending(customerId))
            : store.dispatch(currentUserSlice.actions.setCurrentUser(decodeLoginToken()));
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <ErrorBoundary>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalCss />
                    <Provider store={store}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Provider>
                </ThemeProvider>
            </ErrorBoundary>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
