import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { ChangeEvent } from "react";
import {
  MINUS_ONE_QUANTITY,
  PLUS_ONE_QUANTITY,
  QUANTITY,
} from "../tag/tag.model";

interface IProps {
  quantity: number;
  output: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: theme.spacing(7),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [`& fieldset`]: {
        borderRadius: theme.spacing(3),
      },
    },
    row: {
      flexDirection: "row",
      width: 170,
    },
  })
);

function QuantityPickerComponent(props: IProps) {
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
    <Grid container spacing={1} alignItems="center" className={classes.row}>
      <Fab onClick={decreaseByOne} size="small" data-cy={MINUS_ONE_QUANTITY}>
        <RemoveRoundedIcon />
      </Fab>
      <TextField
        className={classes.textField}
        margin="dense"
        variant="outlined"
        inputProps={{
          style: {
            textAlign: "center",
          },
          "data-cy": QUANTITY,
        }}
        value={quantity}
        onChange={updateNumberInput}
      />
      <Fab onClick={increaseByOne} size="small" data-cy={PLUS_ONE_QUANTITY}>
        <AddRoundedIcon />
      </Fab>
    </Grid>
  );
}

export default QuantityPickerComponent;
