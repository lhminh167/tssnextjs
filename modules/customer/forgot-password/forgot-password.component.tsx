import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, useState } from "react";
import { isOk } from "../../shared/helpers/http.helper";
import { mb, mt } from "../../shared/layout/layout.style";
import SuccessComponent, {
  defaultSuccessComponentProps,
  SuccessComponentProps,
} from "../../shared/success/success.component";
import { EMAIL, SUBMIT } from "../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../shared/validator/validator";
import {
  CustomerForgotPasswordRequest,
  CustomerForgotPasswordRequestValidator,
  defaultCustomerForgotPasswordRequest,
} from "../customer.model";
import { forgotPassword } from "../customer.service";

const useStyles = makeStyles((theme) => ({
  mb: mb,
  mt: mt,
}));

interface Props {}

export default function ForgotPasswordComponent({}: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<CustomerForgotPasswordRequest>(
    defaultCustomerForgotPasswordRequest
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [finished, setFinished] = useState<SuccessComponentProps>(
    defaultSuccessComponentProps
  );
  const errors = new CustomerForgotPasswordRequestValidator().validate(state);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  }

  async function submit() {
    setSubmitted(true);
    if (!isValidForm(errors)) return;
    const response = await forgotPassword(state);
    setFinished({ success: isOk(response.status), title: response.title });
  }

  if (finished.success)
    return (
      <SuccessComponent
        title={finished.title}
        onConfirm={null}
        confirmText=""
      />
    );

  return (
    <Grid container spacing={2} component="form" noValidate>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        className={classes.mt}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        className={classes.mb}
      >
        <Typography component="h1" variant="h5">
          Password assistance
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        // justify='center'
        // className={classes.mb}
      >
        <Typography component="p" variant="body1">
          Please enter email address associated with your account.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          value={state.email}
          onChange={change}
          error={isValidField(errors.email, submitted)}
          helperText={errors.email && submitted ? errors.email : null}
          data-cy={EMAIL}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={submit}
          data-cy={SUBMIT}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
