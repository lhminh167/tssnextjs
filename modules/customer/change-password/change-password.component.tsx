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
import {
  CONFIRM_NEW_PASSWORD,
  NEW_PASSWORD,
  PASSWORD,
  SUBMIT,
} from "../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../shared/validator/validator";
import {
  CustomerUpdatePasswordState,
  CustomerUpdatePasswordStateValidator,
  defaultCustomerUpdatePasswordState,
} from "../customer.model";
import { updatePassword } from "../customer.service";

const useStyles = makeStyles((theme) => ({
  mb: mb,
  mt: mt,
}));

interface Props {
  // #region Properties (1)

  userId: number;

  // #endregion Properties (1)
}

export default function ChangePasswordComponent({ userId }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<CustomerUpdatePasswordState>(
    defaultCustomerUpdatePasswordState
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [finished, setFinished] = useState<SuccessComponentProps>(
    defaultSuccessComponentProps
  );
  const errors = new CustomerUpdatePasswordStateValidator().validate(state);

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
    const response = await updatePassword({
      customerId: userId,
      password: state.password,
      newPassword: state.newPassword,
    });
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
          Change Password
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name={PASSWORD}
          label="Current Password"
          type="password"
          autoComplete="current-password"
          value={state.password}
          onChange={change}
          error={isValidField(errors.password, submitted)}
          helperText={errors.password && submitted ? errors.password : null}
          data-cy={PASSWORD}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name={NEW_PASSWORD}
          label="New Password"
          type="password"
          autoComplete="new-password"
          value={state.newPassword}
          onChange={change}
          error={isValidField(errors.newPassword, submitted)}
          helperText={
            errors.newPassword && submitted ? errors.newPassword : null
          }
          data-cy={NEW_PASSWORD}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name={CONFIRM_NEW_PASSWORD}
          label="Confirm New Password"
          type="password"
          autoComplete="new-password"
          value={state.confirmNewPassword}
          onChange={change}
          error={isValidField(errors.confirmNewPassword, submitted)}
          helperText={
            errors.confirmNewPassword && submitted
              ? errors.confirmNewPassword
              : null
          }
          data-cy={CONFIRM_NEW_PASSWORD}
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
