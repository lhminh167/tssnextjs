import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import * as Sentry from "@sentry/browser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import FooterComponent from "../footer/footer.component";
import { getCurrentUser } from "../helpers/auth.helper";
import NavbarComponent from "../navbar/navbar.component";
import Notifier from "../notifier/notifier.component";
import { mb } from "./layout.style";
import theme, { transitionWidth } from "./layout.theme";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(18),
      [theme.breakpoints.up(transitionWidth)]: {
        marginTop: theme.spacing(12),
      },
      ...mb,
    },
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
  })
);

export default function LayoutComponent(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.ENV !== "production")
      Sentry.init({
        dsn: "https://092f990227db4c81b121d898afcd93dc@sentry.io/5189172",
      });

    getCurrentUser(dispatch);

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles?.parentNode?.removeChild(jssStyles);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutContentComponent {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export function LayoutContentComponent(props: any) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <NavbarComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <Notifier />
      </ErrorBoundary>
      <ErrorBoundary>
        <main className={classes.main} children={props.children} />
      </ErrorBoundary>
      <ErrorBoundary>
        <FooterComponent />
      </ErrorBoundary>
    </div>
  );
}
