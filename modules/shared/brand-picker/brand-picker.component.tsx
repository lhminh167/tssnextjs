import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ChangeEvent } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { IRootState } from '../../root/root.model';
import { uncheckedColor } from '../layout/layout.theme';

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
    const classes = useStyles(props);
    // const { productFilter: { filter: { data } } } = useTrackedState<IRootState>();
    // const data = useSelector(state => state.productFilter.filter.data)
    const dispatch = useDispatch();

    const brands = props.categories;
    const chosenCategoryIds = props.chosenCategoryIds;

    // const brands = data.categories;
    // const chosenCategoryIds = data.chosenCategoryIds;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const eventValue = Number((event.target as HTMLInputElement).value);

        const toBeUnchecked = chosenCategoryIds.some(chosenCategoryId => chosenCategoryId === eventValue)

        // toBeUnchecked ?

        //     dispatch(productFilter.actions.removeCategory(eventValue)) :

        //     dispatch(productFilter.actions.chooseCategory(eventValue));
    };

    const checkboxes = brands.map(brand => (
        <FormControlLabel
            className={classes.formControlLabel}
            key={brand.categoryId}
            control={
                <Checkbox
                    checked={chosenCategoryIds.some(chosenId => chosenId === brand.categoryId)}
                    onChange={handleChange}
                    value={brand.categoryId}
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
