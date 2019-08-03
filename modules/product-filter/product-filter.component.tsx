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
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import CustomPaginationActionsTable from "../product-filter/product-list/product-list.component";
import { IRootState } from "../root/root.model";
import ColorPicker from "../shared/color-picker/color-picker.component";
import SizePicker from "../shared/size-picker/size-picker.component";
import TwoHandleSlider from "../shared/slider/twoHandleSlider.component";
import { productFilter } from "./product-filter.redux";

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
        fab: {
            margin: theme.spacing(1),
            minWidth: '122.25px'
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
            minWidth: '122.25px'
        },
    })
);

function ProductFilter(props) {
    const classes = useStyles(props);
    const { productFilter: { filter: { data } } } = useTrackedState<IRootState>();
    const dispatch = useDispatch();

    const [choice, setChoice] = useState(productFilter.choiceInitialState)

    const colors = data.colors;
    const sizes = data.sizes;
    const categories = data.categories;

    const chooseColor = (colorId) => {
        setChoice({ ...choice, colorId })
    }

    const chooseSize = (sizeId) => {
        setChoice({ ...choice, sizeId })
    }

    const chooseCategory = (categoryIds) => {
        // choice.categoryIds = categoryIds;
    }

    const handleApply = () => {
    }

    const handleClear = () => {
    }

    useEffect(() => {
        dispatch(productFilter.filter.actions.getPending());
        return () => { return; };
    }, [])

    return (
        <Fragment>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>
                                Filter 486 items
                            </Typography>
                        </ExpansionPanelSummary>
                        <Divider />
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            {colors && colors.length > 0 &&
                                <ColorPicker colors={colors} output={chooseColor} />
                            }
                            {sizes && sizes.length > 0 &&
                                <SizePicker sizes={sizes} output={chooseSize} />
                            }
                            <TwoHandleSlider />
                            {/*categories && categories.length > 0 &&
                                <BrandPicker categories={categories} output={chooseCategory} />
                            */}
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions className={classes.expansionPanelActions}>
                            <Fab variant="extended" color="primary" aria-label="Apply" className={classes.fab} onClick={handleApply}>
                                Apply
                            </Fab>
                            <Button color="primary" className={classes.button} onClick={handleClear}>
                                <ClearIcon className={classes.extendedIcon} />
                                Clear All
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>


                </Grid>
                <Grid item xs={12}>
                    <CustomPaginationActionsTable />
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ProductFilter;
