import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from "@material-ui/core/FormLabel";
import { useState, useEffect, ChangeEvent } from 'react';
import { uncheckedColor } from '../layout/layout.theme';
import { makeStyles } from '@material-ui/styles';
import { useReduxState } from 'reactive-react-redux';

export const CheckBoxBlankIcon = <svg width="24px" height="24px" viewBox="0 0 24 24">
    <path fill={uncheckedColor} d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
</svg>

const useStyles = makeStyles((theme: Theme) => ({
    group: {
        // maxHeight: '200px',
        // overflow: 'scroll'
    },
    formControlLabel: {
        // display: 'block'
    }
}));


function BrandPicker(props) {
    const classes = useStyles();
    const state = useReduxState();

    const brands = state.productFilter.data.categories;

    function addChecked(brands) {
        return brands.map(brand => ({ ...brand, checked: false }))
    }

    const [localState, setLocalState] = useState(addChecked(brands));

    const handleChange = (index) => (event: ChangeEvent<HTMLInputElement>) => {
        setLocalState([...brands, { ...brands[index], checked: event.target.checked }]);
        output(localState);
    };

    function output(state) {
        props.output(state);
    };

    const checkboxes = brands.map((brand, index) => (
        <FormControlLabel
            className={classes.formControlLabel}
            key={index}
            control={
                <Checkbox
                    checked={brand.checked}
                    onChange={handleChange(index)}
                    value={brand.id}
                    color="secondary"
                    icon={CheckBoxBlankIcon}
                />
            }
            label={brand.name}
        />
    ));

    return (
        <FormGroup className={classes.group}>
            <FormLabel component="legend" >Brand</FormLabel>
            {checkboxes}
        </FormGroup>
    );
}

export default BrandPicker;
