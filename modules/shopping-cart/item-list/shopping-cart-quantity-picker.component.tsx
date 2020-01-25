import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import QuantityPicker from '../../shared/quantity-picker/quantity-picker.component';
import { IShopingCartItem } from '../shopping-cart.model';
import { shoppingCartSlice } from '../shopping-cart.slice';

interface IProps {
    item: IShopingCartItem;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

function ShoppingCartQuantityPicker(props: IProps) {
    const classes = useStyles(props);
    const { item } = props;
    const [state, setState] = useState(item.quantity);
    const dispatch = useDispatch();

    function updateItem() {
        dispatch(shoppingCartSlice.actions.updateItemPending({
            previousItem: item,
            item: { ...item, quantity: state }
        }));
    }

    return (
        <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
        >
            <QuantityPicker quantity={state} output={setState} />
            <Grid item
            >
                <Tooltip title="Save the quantity">
                    <Fab
                        color="primary"
                        onClick={updateItem}
                        size="small"
                    >
                        <RefreshIcon />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default ShoppingCartQuantityPicker;

