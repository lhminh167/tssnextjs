import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment, useState } from "react";
import { ConfirmationDialog } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { IReview } from "../../../shared/models/review.model";
import { REMOVE, REVIEW, tag } from "../../../shared/tag/tag.model";
import { deleteReview } from "../review.service";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  data: IReview;
  output: any;
}

export default function ProductReviewDeleteComponent({ data, output }: Props) {
  const classes = useStyles({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function removeReview() {
    setIsLoading(true);
    await deleteReview(data);
    setIsOpen(false);
    setIsLoading(false);
    output(data);
  }

  async function open() {
    setIsOpen(true);
  }

  async function close() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={open}
        data-cy={tag(REMOVE, data.reviewId, REVIEW)}
      >
        Delete
      </Button>
      <ConfirmationDialog
        open={isOpen}
        close={null}
        confirm={removeReview}
        decline={close}
        isLoading={isLoading}
      ></ConfirmationDialog>
    </Fragment>
  );
}
