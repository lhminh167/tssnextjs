import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import { transitionWidth } from "./layout.theme";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import Notifier from "../notifier/notifier.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(18),
      [theme.breakpoints.up(transitionWidth)]: {
        marginTop: theme.spacing(12)
      }
    }
  })
);

export default function Layout(props) {
  const classes = useStyles(props);

  return (
    <Fragment>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Notifier />
      </ErrorBoundary>
      <ErrorBoundary>
        <main className={classes.main} children={props.children} />
      </ErrorBoundary>
    </Fragment>
  );
}
