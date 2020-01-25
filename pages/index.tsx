import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ProductFilter from '../modules/product-filter/product-filter.component';
import { productFilter } from '../modules/product-filter/product-filter.slice';
import { IRootState } from '../modules/root/root.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            // width: 500,
            // height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

function Home(props) {
    const classes = useStyles(props);
    const data = useSelector(
        (state: IRootState) => state.productFilter
    )

    return (
        <ProductFilter data={data} />
    );
}

Home.getInitialProps = function(props) {
    const { store, isServer } = props.ctx;
    if (
        store.getState().productFilter.filter.data.attributes.length === 0 ||
        store.getState().productFilter.filter.data.categories.length === 0
    ) {
        store.dispatch(productFilter.filter.actions.getPending());
    }

    if (store.getState().productFilter.product.data.length === 0) {
        store.dispatch(productFilter.product.actions.getPending());
    }

    return { isServer }
}

export default Home;
