import { Container } from '@material-ui/core';
import querystring from 'query-string';
import { END } from 'redux-saga';
import { ProductFilterMetadataComponent } from '../../modules/product/filter/product-filter-metadata.component';
import ProductFilterComponent from '../../modules/product/filter/product-filter.component';
import { defaultProductSearchRequest } from '../../modules/product/filter/product-filter.model';
import productFilterSlice from '../../modules/product/filter/product-filter.slice';
import { initializeStore } from '../../modules/root/root.store';
import ErrorBoundary from '../../modules/shared/error-boundary/error-boundary.component';


export default function ProductSearchPage(props) {
    return (
        <Container>
            <ErrorBoundary>
                <ProductFilterComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <ProductFilterMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const parsedQuery = querystring.parse(
        querystring.stringify(context.query),
        {
            parseNumbers: true,
            parseBooleans: true,
            // skipNull: true
        }
    );

    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;

    dispatch(productFilterSlice.actions.getFilterPending());

    dispatch(productFilterSlice.actions.getProductsPending({
        ...defaultProductSearchRequest,
        ...parsedQuery as any,
    }));

    dispatch(END);

    await reduxStore.sagaTask.toPromise();

    const initialReduxState = reduxStore.getState();

    return {
        props: {
            initialReduxState
        },
    }
}
