import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import Layout from "../modules/shared/layout/layout.component";
import { useStore } from "../modules/root/root.store";

export default function App(props) {

    const store = useStore(props.pageProps.initialReduxState)

    //@ts-ignore
    if (typeof window !== "undefined" && window.Cypress) window.store = store;

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

// export function reportWebVitals(metric) {
//     console.log(metric)
// }