import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClearIcon from "@material-ui/icons/Clear";

import { getPending } from "../generics/generics.actions";
import { Fragment, useEffect, useState } from "react";
import { useReduxDispatch, useReduxState } from 'reactive-react-redux';
import BrandPicker from "../brandPicker/brandPicker.component";
import ColorPicker from "../colorPicker/colorPicker.component";
import SizePicker from "../sizePicker/sizePicker.component";
import TwoHandleSlider from "../slider/twoHandleSlider.component";
import { productFilterEntityName } from "./product.filter.model";
import { ExpansionPanelActions, Fab, Button } from "@material-ui/core";

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
    const classes = useStyles();
    const { productFilter: { data: state } } = useReduxState();
    const [color, setColor] = useState({});
    const [size, setSize] = useState({});
    const [brand, setBrand] = useState({});


    const dispatch = useReduxDispatch();

    useEffect(() => {
        dispatch(getPending(productFilterEntityName));
        return () => { return; };
    }, [])

    function colorOutput(output) {
        setColor(output)
        console.log(color)
    }

    function sizeOutput(output) {
        setSize(output)
        console.log(size)
    }

    function brandOutput(output) {
        setBrand(output)
        console.log(brand)
    }

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
                            <Typography className={classes.heading}>
                                Filter 486 items
                            </Typography>
                        </ExpansionPanelSummary>
                        <Divider />
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            {state.colors && state.colors.length > 0 &&
                                <ColorPicker output={colorOutput} />
                            }
                            {state.colors && state.colors.length > 0 &&
                                <SizePicker output={sizeOutput} />
                            }
                            <TwoHandleSlider />
                            {state.categories && state.categories.length > 0 &&
                                <BrandPicker output={brandOutput} />
                            }
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions className={classes.expansionPanelActions}>
                            <Fab variant="extended" color="primary" aria-label="Apply" className={classes.fab}>
                                Apply
                            </Fab>
                            <Button color="primary" className={classes.button}>
                                <ClearIcon className={classes.extendedIcon} />
                                Clear All
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>


                </Grid>
            </Grid>
        </Fragment>
    );
}

export default ProductFilter;
