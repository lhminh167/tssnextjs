import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Router from "next/router";
import ProductFilterComponent from "../modules/product/filter/product-filter.component";
import productFilterSlice from "../modules/product/filter/product-filter.slice";
import { defaultProductSearchRequest } from "../modules/product/filter/product-filter.model";
import querystring from 'query-string';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function ProductSearchPage(props) {
    const classes = useStyles(props);
    return (
        <ProductFilterComponent
        />
    );
}

ProductSearchPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query,
        req
    },
    ctx
}) {
    
    const parsedQuery = querystring.parse(
        querystring.stringify(query),
        {
            parseNumbers: true,
            parseBooleans: true,
            // skipNull: true
        }
    );

    if (
        isServer
        || !store.getState().productFilter.filter.data.attributes.length
    )
        store.dispatch(productFilterSlice.actions.getFilterPending());

    store.dispatch(productFilterSlice.actions.getProductsPending({
        ...defaultProductSearchRequest,
        ...parsedQuery as any,
    }));
}
