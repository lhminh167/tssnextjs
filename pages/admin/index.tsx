import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AdminListComponent from "../../modules/admin/list/admin-list.component";
import { defaultProductSearchRequest } from "../../modules/product/filter/product-filter.model";
import productFilterSlice from "../../modules/product/filter/product-filter.slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export default function ProductSearchPage(props) {
    const classes = useStyles(props);
    return (
        <AdminListComponent
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
}
