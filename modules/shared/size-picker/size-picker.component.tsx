import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { ChangeEvent } from "react";
import { IAttributeValue } from "../models/attribute-value.model";
import { SIZE } from "../tag/tag.model";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
  },
  group: {
    margin: theme.spacing(1, 0),
    flexDirection: "row",
  },
  formControlLabel: {
    display: "inline-block",
  },
}));

interface Props {
  data: IAttributeValue[];
  state: IAttributeValue;
  output: any;
}

function SizePickerComponent(props: Props) {
  const classes = useStyles(props);
  const { data, state, output } = props;

  function change(event: ChangeEvent<HTMLInputElement>) {
    output(
      data.find(
        (a) =>
          a.attributeValueId ===
          Number((event.target as HTMLInputElement).value)
      )
    );
  }

  function icon(text: string) {
    return (
      <Button variant="contained" size="small">
        {text}
      </Button>
    );
  }

  function checkedIcon(text: string) {
    return (
      <Button variant="contained" color="primary" size="small">
        {text}
      </Button>
    );
  }

  const radios = data
    ? data.map((size) => (
        <FormControlLabel
          key={size.attributeValueId}
          value={size.attributeValueId.toString()}
          control={
            <Radio
              data-cy={SIZE}
              data-id={size.value}
              icon={icon(size.value)}
              checkedIcon={checkedIcon(size.value)}
            />
          }
          label={null}
        />
      ))
    : null;

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Size</FormLabel>
      <RadioGroup
        aria-label="Size"
        name="Size"
        className={classes.group}
        value={state.attributeValueId.toString()}
        onChange={change}
      >
        {radios}
      </RadioGroup>
    </FormControl>
  );
}

export default SizePickerComponent;
