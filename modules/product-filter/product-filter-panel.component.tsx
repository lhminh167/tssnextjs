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
import { ProductFilterFilterEnum, IProductFilterState, IProductFilterChoice } from "./product-filter.model";
import { productFilter } from "./product-filter.slice";
import ColorPicker from "../shared/color-picker/color-picker.component";
import SizePicker from "../shared/size-picker/size-picker.component";
import { IAttributeValue } from "../shared/models/attribute-value.model";
import SkeletonComponent from "../shared/skeleton/skeleton.component";
import { Response } from "../shared/crud/crud.model";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        expansionPanelDetails: {
            display: 'inline-block',
        },
        expansionPanelActions: {
            justifyContent: 'center'
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        button: {
            // margin: theme.spacing(1),
            minWidth: '122.25px !important'
        },
    })
);

interface IProps {
    data: IProductFilterState,
}

function ProductFilterPanelComponent(props: IProps) {
    const classes = useStyles({});
    const { data } = props;
    const dispatch = useDispatch();
    const defaultAttributeValue: IAttributeValue = {
        name: '',
        value: '',
        attributeId: 0,
        attributeValueId: 0
    };

    const [color, setColor] = useState(defaultAttributeValue);
    const [size, setSize] = useState(defaultAttributeValue);

    const attributes = data?.filter?.data?.attributes;
    const colors = attributes?.filter(a => a.attributeId === ProductFilterFilterEnum.Color);
    const sizes = attributes?.filter(a => a.attributeId === ProductFilterFilterEnum.Size);
    // const categories = data.categories;

    const apply = () => {
        dispatch(productFilter.choice.actions.apply({
            attributes: [color, size],
            categories: [],
            minPrice: 0,
            maxPrice: 0
        }));
    }


    const clear = () => {
    }

    return (
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>
                    Filter 486 items
                </Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                {colors && colors.length > 0 && <ColorPicker data={colors} state={color} output={setColor} />}

                {/* {sizes && sizes.length > 0 && <SizePicker data={sizes} output={chooseSize} />} */}

                {/* <TwoHandleSlider /> */}
                {/*categories && categories.length > 0 &&
                    <BrandPicker categories={categories} output={chooseCategory} />
                */}
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions className={classes.expansionPanelActions}>
                <Fab variant="extended" color="primary" className={classes.button} onClick={apply}>
                    Apply
                </Fab>
                <Button color="primary" className={classes.button} onClick={clear}>
                    <ClearIcon className={classes.extendedIcon} />
                    Clear All
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}

export default ProductFilterPanelComponent;
