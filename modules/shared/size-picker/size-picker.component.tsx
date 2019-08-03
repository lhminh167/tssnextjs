import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent, useEffect, useState } from "react";


const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(2, 0)
    },
    group: {
        margin: theme.spacing(1, 0),
        flexDirection: "row"
    },
    formControlLabel: {
        display: "inline-block"
    },
}));

function SizePicker(props) {
    const classes = useStyles(props);
    const { sizes, output } = props;
    const [chosenSizeId, setSize] = useState(0);

    function handleChange(event: ChangeEvent<unknown>) {
        setSize(Number((event.target as HTMLInputElement).value));
    }

    useEffect(() => {
        output(chosenSizeId);
    }, [chosenSizeId]);

    function icon(text: string) {
        return (
            <Button variant="contained" size="small">
                {text}
            </Button>
        );
    }

    function checkedIcon(text: string) {
        return (
            <Button
                variant="contained"
                color="primary"
                size="small"
            >
                {text}
            </Button>
        );
    }

    const radios = sizes.map(size => (
        <FormControlLabel
            key={size.attributeValueId}
            value={size.attributeValueId.toString()}
            control={<Radio icon={icon(size.value)} checkedIcon={checkedIcon(size.value)} />}
            label={null}
        />
    ));

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Size</FormLabel>
            <RadioGroup
                aria-label="Size"
                name="Size"
                className={classes.group}
                value={chosenSizeId.toString()}
                onChange={handleChange}
            >
                {radios}
            </RadioGroup>
        </FormControl>
    );
}

export default SizePicker;
