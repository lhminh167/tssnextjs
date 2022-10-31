import { Divider, Grid, Rating, TablePagination, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment, useState } from "react";
import { defaultRowsPerPageOptions } from "../../../shared/crud/crud.model";
import {
  bgGrey,
  bold,
  mb,
  mb2,
  mlAuto,
  p,
  pl0,
} from "../../../shared/layout/layout.style";
import { IProduct } from "../../../shared/models/product.model";
import {
  defaultReviewGetRequest,
  IReview,
  IReviewGetRequest,
  IReviewGetResponse,
} from "../../../shared/models/review.model";
import PaginationComponent from "../../../shared/pagination/pagination.component";
import {
  AVERAGE_RATING,
  COUNT,
  RATING,
  tag,
} from "../../../shared/tag/tag.model";
import { defaultProductSearchRequest } from "../../filter/product-filter.model";
import CreateReviewComponent from "../create/create-product-review.component";
import ProductReviewDetailComponent from "../detail/product-review-detail.component";
import { getReviews } from "../review.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: bold,
    bgGrey: bgGrey,
    p: p,
    pl0: pl0,
    mb2: mb2,
    mb: mb,
    mlAuto: mlAuto,
  })
);

interface Props {
  data: IProduct;
}

export default function ProductReviewListComponent({ data }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<IReviewGetResponse>(data.review);
  const [choice, setChoice] = useState<IReviewGetRequest>({
    ...defaultReviewGetRequest,
    productId: data.productId,
  });

  async function setNewState() {
    const response = await getReviews(choice);
    setState(response.content);
  }

  async function changePageIndex(event, newPageIndex: number) {
    const newChoice: IReviewGetRequest = {
      ...choice,
      pageIndex: newPageIndex,
    };
    const response = await getReviews(newChoice);
    setState(response.content);
    setChoice(newChoice);
  }

  async function changePageSize(event) {
    const newChoice: IReviewGetRequest = {
      ...choice,
      pageSize: parseInt(event.target.value, 10),
      pageIndex: defaultProductSearchRequest.pageIndex,
    };
    const response = await getReviews(newChoice);
    setState(response.content);
    setChoice(newChoice);
  }

  return (
    <Grid container className={classes.bgGrey + " " + classes.p}>
      <Grid item xs={12}>
        <CreateReviewComponent data={data} output={setNewState} />
      </Grid>
      {state.count > 0 && (
        <Fragment>
          <Grid item xs={12} className={classes.mb2}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12} className={classes.mb2}>
            <Typography component="h3" variant="h5" className={classes.bold}>
              Average Rating
            </Typography>
            <Rating
              value={state.averageRating}
              readOnly
              max={5}
              data-cy={tag(RATING, "", AVERAGE_RATING)}
            />
            <Typography>
              <Typography
                data-cy={tag(COUNT, "", AVERAGE_RATING)}
                component="span"
              >
                {state.count}
              </Typography>{" "}
              ratings
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.mb2}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12} className={classes.mb2}>
            <Typography component="h2" variant="h5" className={classes.bold}>
              Product reviews
            </Typography>
          </Grid>
          <Grid item container component="ul" xs={12} className={classes.pl0}>
            {state.items.map((entry: IReview) => (
              <ProductReviewDetailComponent
                key={entry.reviewId}
                data={entry}
                onRemove={setNewState}
                onUpdate={setNewState}
              />
            ))}
          </Grid>
          <TablePagination
            rowsPerPageOptions={defaultRowsPerPageOptions}
            component="div"
            count={state.count}
            rowsPerPage={choice.pageSize}
            page={choice.pageIndex}
            onPageChange={changePageIndex}
            onRowsPerPageChange={changePageSize}
            ActionsComponent={PaginationComponent}
            className={classes.mlAuto}
            labelRowsPerPage="Items per page:"
          />
        </Fragment>
      )}
    </Grid>
  );
}
