import { makeStyles, Theme, createStyles } from "@material-ui/core";
import productFilterSlice from "../../modules/product/filter/product-filter.slice";
import { defaultProductSearchRequest, IProductSearchRequest } from "../../modules/product/filter/product-filter.model";
import ProductFilterComponent from "../../modules/product/filter/product-filter.component";
import Router from "next/router";
import CreateProductComponent from "../../modules/product/create/create-product.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function CreateProductPage(props) {
    const classes = useStyles(props);
    return (
        <CreateProductComponent
        />
    );
}

CreateProductPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store,
        query
    },
    ctx
}) {
    if (
        isServer
        || !store.getState().productFilter.filter.data.attributes.length
    )
        store.dispatch(productFilterSlice.actions.getFilterPending());
}
