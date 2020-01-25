import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Fragment, useEffect, useState } from "react";
import ProductFilterProductList from "../product-filter/product-list/product-list.component";
import { IRootState } from "../root/root.model";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { ProductFilterFilterEnum, IProductFilterState } from "./product-filter.model";
import { productFilter } from "./product-filter.slice";
import ColorPicker from "../shared/color-picker/color-picker.component";
import SizePicker from "../shared/size-picker/size-picker.component";
import { IAttributeValue } from "../shared/models/attribute-value.model";
import SkeletonComponent from "../shared/skeleton/skeleton.component";
import ProductFilterPanelComponent from "./product-filter-panel.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

interface IProps {
    data: IProductFilterState,
}

function ProductFilter(props: IProps) {
    const classes = useStyles({});
    const { data } = props;
    
    return (
        <Fragment>
            <Grid container 
            spacing={2}>
                <Grid item xs={12}>
                    <ProductFilterPanelComponent data={data}/>
                </Grid>
                <Grid item xs={12}>
                    <ProductFilterProductList rows={data?.product?.data} />
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ProductFilter;
