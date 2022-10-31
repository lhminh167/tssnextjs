import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { ReactNode } from "react";
import { NO, YES } from "../tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
    },
  })
);

export interface Props {
  title?: string;
  content?: ReactNode;
  confirmText?: string;
  declineText?: string;
  open: boolean;
  close: any;
  confirm: any;
  decline: any;
  isLoading?: boolean;
  confirmTestId?: string;
  declineTestId?: string;
}

export function ConfirmationDialog({
  title,
  content,
  confirmText,
  declineText,
  open,
  close,
  confirm,
  decline,
  isLoading,
  confirmTestId,
  declineTestId,
}: Props) {
  const classes = useStyles({});
  return (
    <Dialog disableEscapeKeyDown maxWidth="xs" open={open}>
      <Backdrop className={classes.backdrop} open={isLoading ?? false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6">{title ?? "Confirmation"}</Typography>
          </Grid>
          <Grid item>
            {close && (
              <IconButton onClick={close} size="large">
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        {content ?? 'To confirm this action, please click the "Ok" button.'}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={decline}
          color="primary"
          data-cy={declineTestId ?? NO}
        >
          {declineText ?? "Cancel"}
        </Button>
        <Button
          onClick={confirm}
          color="primary"
          data-cy={confirmTestId ?? YES}
        >
          {confirmText ?? "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
