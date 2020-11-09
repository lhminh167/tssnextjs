import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { mount } from 'cypress-react-unit-test';
import React from 'react';
import theme from '../../../../modules/shared/layout/layout.theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { getStore, initializeStore, useStore } from '../../../../modules/root/root.store';
import { rootInitialState } from '../../../../modules/root/root.state';

export interface CyMountProps {
    Component: any;
    props?: any;
}

export function cyMount({
    Component,
    props
}: CyMountProps) {

    const router = {
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        components: {},
        isFallback: false,
        basePath: '',
        events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
        push: cy.spy(),
        replace: cy.spy(),
        reload: cy.spy(),
        back: cy.spy(),
        prefetch: () => new Promise<any>((resolve, reject) => {
            resolve({ catch: cy.spy(), url: '', asPdath: '', options: {} })
        }),
        beforePopState: cy.spy(),
    }

    return mount(
        <Provider store={initializeStore()}>
            <ThemeProvider theme={theme}>
                <RouterContext.Provider value={router}>
                    <Component {...props} />
                </RouterContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}