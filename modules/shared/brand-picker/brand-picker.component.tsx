import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { ChangeEvent } from 'react';
import { IProductFilterCategory } from '../../product/filter/product-filter.model';
import { themeColor } from '../layout/layout.theme';
import { CATEGORY } from '../tag/tag.model';

export const CheckBoxBlankIcon = <svg width='24px' height='24px' viewBox='0 0 24 24'>
    <path fill={themeColor.primary} d='M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z' />
</svg>

interface Props {
    state: string[],
    data: IProductFilterCategory[],
    output: any
}

function BrandPickerComponent({
    state,
    data,
    output
}: Props) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = (event.target as HTMLInputElement).value;
        const index = state.findIndex(chosen => chosen === name);
        const newState = [...state];
        index >= 0 ? newState.splice(index, 1) : newState.push(name);
        output(newState);
    };

    const checkboxes = data.map(entry => (
        <FormControlLabel
            key={entry.name}
            control={
                <Checkbox
                    checked={state.some(chosen => chosen === entry.name)}
                    onChange={handleChange}
                    value={entry.name}
                    color='secondary'
                    icon={CheckBoxBlankIcon}
                    data-cy={CATEGORY + entry.name}
                />
            }
            label={entry.name}
        />
    ));

    return (
        <FormGroup>
            <FormLabel component='legend' >Category</FormLabel>
            {checkboxes}
        </FormGroup>
    );
}

export default BrandPickerComponent;
