import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import Grid from '@material-ui/core/Grid';
import { ColorProperty, BorderRadiusProperty, FontSizeProperty } from 'csstype';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { MINUS_ONE_QUANTITY, ADJUST_QUANTITY, PLUS_ONE_QUANTITY } from './quantity-picker.tag';

interface IProps {
  quantity: number;
  output: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: theme.spacing(7),
      [`& fieldset`]: {
        borderRadius: theme.spacing(3)
      }
    },
    row: {
      flexDirection: 'row',
      width: 150
    }
  })
);

function QuantityPicker(props: IProps) {
  const classes = useStyles(props);
  const { quantity, output } = props;

  function increaseByOne() {
    output(quantity + 1);
  }

  function decreaseByOne() {
    const newState = quantity - 1;
    if (newState >= 1) output(newState);
  }

  function updateNumberInput(event: ChangeEvent<HTMLInputElement>) {
    output(Number(event.target.value));
  }

  return (
    <Grid
      container
      spacing={1}
      // direction='row'
      // item
      alignItems='center'
      className={classes.row}
    >
      {/* <Grid item> */}
      <Fab
        onClick={decreaseByOne}
        size='small'
        data-cy={MINUS_ONE_QUANTITY}
      >
        <RemoveRoundedIcon />
      </Fab>
      {/* </Grid>
      <Grid item> */}
      <TextField
        className={classes.textField}
        margin='dense'
        variant='outlined'
        inputProps={{
          style: {
            textAlign: 'center'
          },
          'data-cy': ADJUST_QUANTITY
        }}
        value={quantity}
        onChange={updateNumberInput}
      />
      {/* </Grid>
      <Grid item> */}
      <Fab
        onClick={increaseByOne}
        size='small'
        data-cy={PLUS_ONE_QUANTITY}
      >
        <AddRoundedIcon />
      </Fab>
      {/* </Grid> */}
    </Grid>
  );
}

export default QuantityPicker;
