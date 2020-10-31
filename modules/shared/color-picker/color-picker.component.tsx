import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Color } from "csstype";
import { ChangeEvent } from "react";
import { IAttributeValue } from "../models/attribute-value.model";
import { COLOR } from "../tag/tag.model";


const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(2, 0)
    },
    group: {
        margin: theme.spacing(1, 0),
        flexDirection: 'row'
    },
    icon: {
        borderRadius: '50%',
        border: 'lightgrey 1px solid',
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    iconBorder: {
        padding: theme.spacing(0.5),
        borderRadius: '50%',
        border: 'transparent 1px solid',
    },
    checkedIcon: {
        border: 'lightgrey 1px solid',
    }
}));

interface Props {
    data: IAttributeValue[];
    state: IAttributeValue;
    output: any;
}

function ColorPicker(props: Props) {
    const classes = useStyles(props);

    const { data, state, output } = props;

    function handleChange(event: ChangeEvent<unknown>) {
        output(data.find(a => a.attributeValueId === Number((event.target as HTMLInputElement).value)));
    }

    function icon(color: Color) {
        const icon = (<div
            className={classes.iconBorder}
        >
            <div
                className={classes.icon}
                style={{ background: color }}
            ></div>
        </div>);
        return icon;
    }

    function checkedIcon(color: Color) {
        const checkedIcon = (
            <div
                className={classes.checkedIcon + ' ' + classes.iconBorder}
            >
                <div
                    className={classes.icon}
                    style={{ background: color }}
                ></div>
            </div>
        );
        return checkedIcon;
    }

    const colorRadios = data ? data.map(color => (
        <FormControlLabel
            key={color.attributeValueId}
            value={color.attributeValueId.toString()}
            control={<Radio icon={icon(color.value)} checkedIcon={checkedIcon(color.value)} />}
            data-cy={COLOR}
            data-id={color.value}
            label={null}
        />
    )) : null;

    return (
        <FormControl
            component='fieldset'
        // className={classes.formControl}
        >
            <FormLabel
                component='legend'
            >
                Color
            </FormLabel>
            <RadioGroup
                name='Color'
                className={classes.group}
                value={state.attributeValueId.toString()}
                onChange={handleChange}
            >
                {colorRadios}
            </RadioGroup>
        </FormControl>
    );
}

export default ColorPicker;
