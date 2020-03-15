import { createStyles, makeStyles, Theme } from "@material-ui/core";
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
        <ProductFilterComponent
        />
    );
}

ProductSearchPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query
    },
    ctx
}) {
    
    store.dispatch(productFilterSlice.actions.getFilterPending());
    store.dispatch(productFilterSlice.actions.getProductsPending({
        ...defaultProductSearchRequest,
        ...query as any,
        minPrice: Number(query.minPrice),
        maxPrice: Number(query.maxPrice),
        isPagingEnabled: Boolean(query.isPagingEnabled),
        isDescending: Boolean(query.isDescending),
        pageIndex: Number(query.pageIndex),
        pageSize: Number(query.pageSize),
    }));
}
