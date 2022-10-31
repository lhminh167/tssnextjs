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
  EMAIL,
  FORGOT_PASSWORD,
  PASSWORD,
  REGISTER_LINK,
  SUBMIT,
} from "../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../shared/validator/validator";
import { ILoginRequest, LoginRequestValidator } from "../customer.model";
import { currentUserSlice } from "../customer.slice";

const useStyles = makeStyles((theme) => ({
  mb: mb,
  mb2: mb2,
}));

export default function LoginComponent() {
  const classes = useStyles({});
  const [state, setState] = useState<ILoginRequest>({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const errors = new LoginRequestValidator().validate(state);

  const router = useRouter();
  const dispatch = useDispatch();

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

    dispatch(currentUserSlice.actions.loginPending(state));
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
        className={classes.mb}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={state.email}
        onChange={change}
        error={isValidField(errors.email, submitted)}
        helperText={errors.email && submitted ? errors.email : null}
        data-cy={EMAIL}
      />
      <TextField
        variant="outlined"
        margin="normal"
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
        className={classes.mb2}
        data-cy={PASSWORD}
      />
      {/* <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    /> */}
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.mb}
        onClick={submit}
        data-cy={SUBMIT}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link
            href="/user/forgot-password"
            as="/user/forgot-password"
            passHref
          >
            <Typography
              variant="body2"
              component="a"
              color="primary"
              data-cy={FORGOT_PASSWORD}
            >
              Forgot password?
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link
            href={{
              pathname: "/user/register",
              query: {
                next: router.query.next ?? "/",
              },
            }}
            as="/user/register"
            passHref
          >
            <Typography
              component="a"
              variant="body2"
              color="primary"
              data-cy={REGISTER_LINK}
            >
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
