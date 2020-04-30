import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import querystring from 'query-string';
import ProductFilterComponent from "../../modules/product/filter/product-filter.component";
import { defaultProductSearchRequest } from "../../modules/product/filter/product-filter.model";
import productFilterSlice from "../../modules/product/filter/product-filter.slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function ProductSearchPage(props) {
    const classes = useStyles(props);
    return (
        <Container>
            <ProductFilterComponent
            />
        </Container>
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
