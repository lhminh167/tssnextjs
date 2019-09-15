import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';
import { ColorProperty, BorderRadiusProperty, FontSizeProperty } from "csstype";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

interface IProps {
    quantity: number;
    output: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // alignItems: "center",
            // justifyContent: "center",
            // display: "flex"
        },
        grid: {
        //   flexShrink: 0,
        //   flex: "0 0 auto"

        },
        button: {

            // marginTop: 12,
            // marginBottom: 12,
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1)
        },
        icon: {
        },
        textField: {
            // marginRight: theme.spacing(1),
            width: theme.spacing(7),
            [`& fieldset`]: {
                borderRadius: theme.spacing(3),
            },
        },
        updateButton: {
            // paddingTop: 10,
            // paddingBottom: 10,
            // marginLeft: theme.spacing(2),
            // marginRightt: theme.spacing(2)
        }
    }),
);

function QuantityPicker(props: IProps) {
    const classes = useStyles(props);
    const { quantity, output } = props;
    const [state, setState] = useState(quantity);
    // const firstUpdate = useRef(true);

    // useEffect(() => {
    //     firstUpdate.current ?
    //     firstUpdate.current = false :
    //     output(state);
    // }, [state]);

    function increaseByOne() {
        setState(state + 1);
    }

    function decreaseByOne() {
        const newState = state - 1;
        if (newState >= 1)
            setState(newState);
    }

    function updateNumberInput(event: ChangeEvent<HTMLInputElement>) {
        setState(Number(event.target.value));
    }

    function updateQuantity() {
        output(state);
    }

    return (
        <Grid container className={classes.root} spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        >
            <Grid item
            className={classes.grid}
            >

                <Fab className={classes.button}
                    onClick={decreaseByOne}
                    size="small"
                >
                    <RemoveRoundedIcon className={classes.icon} />
                </Fab>
            </Grid>
            <Grid item
            className={classes.grid}
            >
                <TextField

                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    inputProps={{
                        style: {
                            textAlign: "center",
                            // paddingTop: 6.5,
                            // paddingBottom: 6.5,
                        }
                    }}
                    value={state}
                    onChange={updateNumberInput}
                // onBlur={changeQuantity}
                />
            </Grid>
            <Grid item
            className={classes.grid}
            >
                <Fab
                    className={classes.button}
                    onClick={increaseByOne}
                    size="small"
                >
                    <AddRoundedIcon className={classes.icon} />
                </Fab>
            </Grid>
            <Grid item
            className={classes.grid}
            >
                <Tooltip title="Save the quantity">
                    <Fab
                        className={classes.button}
                        color="primary"
                        onClick={updateQuantity}
                        size="small"
                    >
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default QuantityPicker;

