import { Theme } from "@mui/material";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { bgGrey, p } from "../layout/layout.style";
import { BACK, SUBMIT } from "../tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    p: p,
    bgGrey: bgGrey,
  })
);

interface Props {
  backButtonText?: string;
  nextButtonText?: string;
  back?: any;
  next?: any;
  nextButtonDisabled?: boolean;
  backDataTestId?: string;
  nextDataTestId?: string;
}

export default function ActionButtonsComponent({
  backButtonText,
  nextButtonText,
  back,
  next,
  nextButtonDisabled,
  backDataTestId,
  nextDataTestId,
}: Props) {
  const classes = useStyles({});

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.p + " " + classes.bgGrey}
    >
      {backButtonText && (
        <Fab variant="extended" onClick={back} data-cy={backDataTestId ?? BACK}>
          {backButtonText}
        </Fab>
      )}
      {nextButtonText && (
        <Fab
          variant="extended"
          color="primary"
          onClick={next}
          disabled={nextButtonDisabled}
          data-cy={nextDataTestId ?? SUBMIT}
        >
          {nextButtonText}
        </Fab>
      )}
    </Grid>
  );
}
