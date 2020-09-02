import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ChangeEvent, useEffect, useState } from 'react';
import { IAttributeValue } from '../models/attribute-value.model';


const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(2, 0)
    },
    group: {
        margin: theme.spacing(1, 0),
        flexDirection: 'row'
    },
    formControlLabel: {
        display: 'inline-block'
    },
}));

interface Props {
    data: IAttributeValue[];
    state: IAttributeValue;
    output: any;
}


function SizePicker(props: Props) {
    const classes = useStyles(props);
    const { data, state, output } = props;

    function handleChange(event: ChangeEvent<unknown>) {
        output(data.find(a => a.attributeValueId === Number((event.target as HTMLInputElement).value)));
    }

    function icon(text: string) {
        return (
            <Button variant='contained' size='small'>
                {text}
            </Button>
        );
    }

    function checkedIcon(text: string) {
        return (
            <Button
                variant='contained'
                color='primary'
                size='small'
            >
                {text}
            </Button>
        );
    }

    const radios = data ? data.map(size => (
        <FormControlLabel
            key={size.attributeValueId}
            value={size.attributeValueId.toString()}
            control={<Radio icon={icon(size.value)} checkedIcon={checkedIcon(size.value)} />}
            label={null}
            data-cy='size'
        />
    )) : null;

    return (
        <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Size</FormLabel>
            <RadioGroup
                aria-label='Size'
                name='Size'
                className={classes.group}
                value={state.attributeValueId.toString()}
                onChange={handleChange}
            >
                {radios}
            </RadioGroup>
        </FormControl>
    );
}

export default SizePicker;
