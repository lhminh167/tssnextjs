import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Color } from "csstype";
import { ChangeEvent, useState, useEffect } from "react";
import { FiberManualRecord, RadioButtonChecked } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { useReduxState, useReduxDispatch } from "reactive-react-redux";

const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(2, 0)
    },
    group: {
        margin: theme.spacing(1, 0),
        flexDirection: "row"
    },
    icon: {
        borderRadius: "50%",
        border: 'lightgrey 1px solid',
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    iconBorder: {
        padding: theme.spacing(0.5),
        borderRadius: "50%",
        border: 'transparent 1px solid',
    },
    checkedIcon: {
        border: 'lightgrey 1px solid',
    }
}));

function ColorPicker(props) {
    const classes = useStyles();
    const state = useReduxState();

    const colors = state.productFilter.data.colors;

    const [value, setValue] = useState("0");

    function output(color) {
        props.output(color);
    };

    function handleChange(event: ChangeEvent<unknown>) {
        setValue((event.target as HTMLInputElement).value.toString());
        output(colors[Number(value)])
    }


    function icon(color: Color) {
        const icon = (<div className={classes.iconBorder}>
            <div className={classes.icon} style={{ background: color }}></div>
        </div>);
        return icon;
    }

    function checkedIcon(color: Color) {
        const checkedIcon = (<div className={classes.checkedIcon + ' ' + classes.iconBorder}>
            <div className={classes.icon} style={{ background: color }}></div>
        </div>);
        return checkedIcon;
    }

    const colorRadios = colors ? colors.map((color, index) => (
        <FormControlLabel
            key={index}
            value={index.toString()}
            control={<Radio icon={icon(color.value)} checkedIcon={checkedIcon(color.value)} />}
            label={null}
        />
    )) : null;

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Color</FormLabel>
            <RadioGroup
                aria-label="Color"
                name="Color"
                className={classes.group}
                value={value}
                onChange={handleChange}
            >
                {colorRadios}
            </RadioGroup>
        </FormControl>
    );
}

export default ColorPicker;
