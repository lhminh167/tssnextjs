import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import withReduxSaga from 'next-redux-saga';
import App, { Container } from 'next/app';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'reactive-react-redux';
import createStore from '../modules/root/root.store';
import theme from '../modules/shared/layout/layout.theme';
import Notifier from '../modules/shared/notifier/notifier.component';
import Layout from '../modules/shared/layout/layout.component';
import Loader from '../modules/shared/loader/loader.component';
import { TssStore } from '../modules/root/root.model';

interface Props {
    store: TssStore
}

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore() {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return createStore()
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = createStore()
    }
    return window[__NEXT_REDUX_STORE__]
}


class MyApp extends App<Props> {

    store = createStore();


    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx })
        }

        return { pageProps }
    }

    componentDidMount() {
        /**
     * Remove the server-side injected CSS.
     */
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={this.store}>
                {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                <ThemeProvider
                    theme={theme}
                >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    <SnackbarProvider
                        maxSnack={2}
                    >

                        <Notifier />

                        <Loader />

                        <Layout>
                            {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server-side. */}
                            <Component
                                {...pageProps}
                            />
                        </Layout>

                    </SnackbarProvider>

                </ThemeProvider>
            </Provider>
        )
    }
}


function withReduxStore(App) {
    return class AppWithRedux extends React.Component {

        private reduxStore;

        static async getInitialProps(appContext) {
            // Get or Create the store with `undefined` as initialState
            // This allows you to set a custom default initialState
            const reduxStore = getOrCreateStore()

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore

            let appProps = {}
            if (typeof App.getInitialProps === 'function') {
                appProps = await App.getInitialProps(appContext)
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            }
        }

        constructor(props) {
            super(props)
            this.reduxStore = getOrCreateStore()
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}


export default
    withReduxStore(
        withReduxSaga(
            MyApp
        )
    )