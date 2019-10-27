import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import theme from '../modules/shared/layout/layout.theme';
import Layout from '../modules/shared/layout/layout.component';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createStore, { TssStore } from '../modules/root/root.store'

interface IProps {
    store: TssStore;
}

class MyApp extends App<IProps> {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx })
        }

        return { pageProps }
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props
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
