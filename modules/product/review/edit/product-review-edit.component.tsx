import {
  adaptV4Theme,
  createTheme,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  StyledEngineProvider,
  TextField,
  Theme,
  ThemeProvider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../root/root.model";
import { toNumber } from "../../../shared/helpers/auth.helper";
import { formatDatetime } from "../../../shared/helpers/string.helper";
import { bold, mb, mb2, mr } from "../../../shared/layout/layout.style";
import theme from "../../../shared/layout/layout.theme";
import {
  CreateReviewRequestValidator,
  IReview,
} from "../../../shared/models/review.model";
import {
  CANCEL,
  DATETIME,
  DESCRIPTION,
  EDIT,
  NAME,
  RATING,
  REVIEW,
  SUBMIT,
  tag,
} from "../../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../../shared/validator/validator";
import { updateReview } from "../review.service";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const inputTheme = createTheme(
  adaptV4Theme({
    ...theme,
    overrides: {},
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: bold,
    mb: mb,
    mb2: mb2,
    mr: mr,
  })
);

interface Props {
  data: IReview;
  output: any;
  close: any;
}

export default function ProductReviewEditComponent({
  data,
  output,
  close,
}: Props) {
  const classes = useStyles({});
  const customerId: number = useSelector((state: IRootState) =>
    toNumber(state.currentUser.data.customerId)
  );
  const [state, setState] = useState<IReview>(data);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const errors = new CreateReviewRequestValidator().validate(state);

  useEffect(() => {
    setState({
      ...state,
      customerId,
    });
  }, [customerId]);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value =
      target.name === "edit-rating" ? Number(target.value) : target.value;

    setState({
      ...state,
      [name === "edit-rating" ? "rating" : name]: value,
    });
  }

  async function submit() {
    try {
      setSubmitted(true);
      if (!isValidForm(errors)) return;
      const response = await updateReview(state);
      setSubmitted(false);
      output(response.content);
    } catch (e) {}
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          component="h3"
          variant="subtitle1"
          className={classes.bold}
          data-cy={tag(NAME, state.reviewId, EDIT + REVIEW)}
        >
          {data.customer.name}
        </Typography>
        <Typography
          variant="subtitle2"
          data-cy={tag(DATETIME, state.reviewId, EDIT + REVIEW)}
        >
          {formatDatetime(data.createdOn)}
        </Typography>
      </Grid>
      <Grid item container xs={12} component="form" noValidate>
        <Grid item container xs={12} className={classes.mb}>
          <Grid item xs={12} sm={4} component={Typography}>
            Your Review
          </Grid>
          <Grid item xs={12} sm={8}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={inputTheme}>
                <TextField
                  placeholder="Your review must be at least 50 characters."
                  multiline
                  fullWidth
                  rows={4}
                  name="review1"
                  variant="outlined"
                  margin="dense"
                  value={state.review1}
                  onChange={change}
                  error={isValidField(errors.review1, submitted)}
                  helperText={
                    errors.review1 && submitted ? errors.review1 : null
                  }
                  data-cy={tag(DESCRIPTION, state.reviewId, EDIT + REVIEW)}
                />
              </ThemeProvider>
            </StyledEngineProvider>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.mb}>
          <Grid item xs={12} sm={4} component={Typography}>
            Overall Rating
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl>
              <Rating
                name="edit-rating"
                value={state.rating}
                onClick={change}
                max={5}
                data-cy={tag(RATING, state.reviewId, EDIT + REVIEW)}
              />
              {errors.rating && submitted && (
                <FormHelperText id="rating">{errors.rating}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.mb2}>
          <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={8}>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={submit}
              className={classes.mr}
              data-cy={tag(SUBMIT, state.reviewId, EDIT + REVIEW)}
            >
              Submit
            </Fab>
            <Fab
              variant="extended"
              size="small"
              onClick={close}
              data-cy={tag(CANCEL, state.reviewId, EDIT + REVIEW)}
            >
              Cancel
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
