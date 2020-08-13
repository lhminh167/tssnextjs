import Head from "next/head";
import React from "react";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import Layout from "../modules/shared/layout/layout.component";
import { Provider } from "react-redux";
import { store } from "../modules/root/root.store";

function App(props) {
    return (
        <ErrorBoundary>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
            </Head>
            <Provider store={store}>

                <Layout>
                    <props.Component {...props.pageProps} />
                </Layout>
            </Provider>

        </ErrorBoundary>
    );
}

export default App;
