import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ProductFilter from '../modules/product-filter/product-filter.component';
import { productFilter } from '../modules/product-filter/product-filter.slice';
import { IRootState } from '../modules/root/root.model';
import DepartmentComponent from '../modules/department/department.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

function DepartmentPage(props) {
    const classes = useStyles(props);
    const data = useSelector(
        (state: IRootState) => state.productFilter
    )

    return <DepartmentComponent data={data} />
}

DepartmentPage.getInitialProps = function (props) {
    const { store, isServer } = props.ctx;
    return { isServer }
}

export default DepartmentPage;
