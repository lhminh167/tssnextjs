import { Grid, Rating, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment } from "react";
import { formatDatetime } from "../../../shared/helpers/string.helper";
import { bold } from "../../../shared/layout/layout.style";
import { IReview } from "../../../shared/models/review.model";
import {
  DATETIME,
  DESCRIPTION,
  NAME,
  RATING,
  REVIEW,
  tag,
} from "../../../shared/tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: bold,
  })
);

interface Props {
  data: IReview;
}

export default function ProductReviewComponent({ data }: Props) {
  const classes = useStyles({});

  return (
    <Fragment>
      <Grid item xs={12} sm={4}>
        <Rating
          value={data.rating}
          readOnly
          max={5}
          data-cy={tag(RATING, data.reviewId, REVIEW)}
        />
        <Typography
          component="h3"
          variant="subtitle1"
          className={classes.bold}
          data-cy={tag(NAME, data.reviewId, REVIEW)}
        >
          {data.customer.name}
        </Typography>
        <Typography
          variant="subtitle2"
          component="time"
          data-cy={tag(DATETIME, data.reviewId, REVIEW)}
        >
          {formatDatetime(data.createdOn)}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography
          component="p"
          variant="body1"
          gutterBottom
          data-cy={tag(DESCRIPTION, data.reviewId, REVIEW)}
        >
          {data.review1}
        </Typography>
      </Grid>
    </Fragment>
  );
}
