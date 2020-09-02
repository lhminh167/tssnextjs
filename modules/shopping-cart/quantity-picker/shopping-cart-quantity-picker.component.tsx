import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import QuantityPicker from '../../shared/quantity-picker/quantity-picker.component';
import { IShopingCartItem } from '../shopping-cart.model';
import { updateShoppingCartItem } from '../shopping-cart.service';

interface IProps {
  data: IShopingCartItem;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  row: {
    flexDirection: 'row',
    width: 200
  }
}));

function ShoppingCartQuantityPicker({
  data
}: IProps) {
  const classes = useStyles({});
  const [state, setState] = useState(data.quantity);
  const dispatch = useDispatch();

  function updateItem() {
    updateShoppingCartItem({ ...data, quantity: state })
  }

  return (
    <Grid
      container
      spacing={1}
      // direction='row'
      className={classes.row}
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <QuantityPicker quantity={state} output={setState} />
      </Grid>
      <Grid item>
        <Tooltip title='Save quantity'>
          <Fab
            color='primary'
            onClick={updateItem}
            size='small'
            data-cy='update-quantity'
          >
            <RefreshIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default ShoppingCartQuantityPicker;
