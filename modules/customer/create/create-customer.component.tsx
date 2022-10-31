import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { mb, mb2 } from "../../shared/layout/layout.style";
import {
  CONFIRM_NEW_PASSWORD,
  EMAIL,
  LOGIN_LINK,
  NAME,
  PASSWORD,
  SUBMIT,
} from "../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../shared/validator/validator";
import {
  CreateCustomerStateValidator,
  defaultCreateCustomerState,
  ICreateCustomerState,
  Role,
} from "../customer.model";
import { currentUserSlice } from "../customer.slice";

const useStyles = makeStyles((theme) => ({
  mb: mb,
  mb2: mb2,
}));

export default function CreateCustomerComponent() {
  const classes = useStyles({});
  const [state, setState] = useState<ICreateCustomerState>(
    defaultCreateCustomerState
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const errors = new CreateCustomerStateValidator().validate(state);
  const dispatch = useDispatch();
  const router = useRouter();

  function change(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  }

  function submit(): void {
    setSubmitted(true);

    if (!isValidForm(errors)) return;

    dispatch(
      currentUserSlice.actions.createCustomerPending({
        ...state,
        role: Role.Customer,
      })
    );
  }

  return (
    <Grid container component="form">
      <Grid
        item
        xs={12}
        justifyContent="center"
        container
        className={classes.mb}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        xs={12}
        justifyContent="center"
        container
        className={classes.mb2}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={state.name}
            onChange={change}
            error={isValidField(errors.name, submitted)}
            helperText={errors.name && submitted ? errors.name : null}
            data-cy={NAME}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={state.email}
            onChange={change}
            error={isValidField(errors.email, submitted)}
            helperText={errors.email && submitted ? errors.email : null}
            data-cy={EMAIL}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
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
            name="confirmNewPassword"
            label="Confirm Password"
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
            className={classes.mb2}
            data-cy={CONFIRM_NEW_PASSWORD}
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.mb}
        onClick={submit}
        data-cy={SUBMIT}
      >
        Register
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            href={{
              pathname: "/user/login",
              query: {
                next: router.query.next,
              },
            }}
            as="/user/login"
            passHref
          >
            <Typography
              component="a"
              variant="body2"
              color="primary"
              data-cy={LOGIN_LINK}
            >
              Already have an account? Login
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
