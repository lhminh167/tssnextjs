import { CssBaseline } from "@material-ui/core";
import { createStyles, makeStyles, Theme, ThemeProvider } from "@material-ui/core/styles";
import * as Sentry from '@sentry/browser';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import FooterComponent from "../footer/footer.component";
import { getCurrentUser } from "../helpers/auth.helper";
import Navbar from "../navbar/navbar.component";
import Notifier from "../notifier/notifier.component";
import { mb } from "./layout.style";
import theme, { transitionWidth } from "./layout.theme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: theme.spacing(18),
            [theme.breakpoints.up(transitionWidth)]: {
                marginTop: theme.spacing(12)
            },
            ...mb
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }
    })
);

export default function Layout(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();

    useEffect(() => {
        if (process.env.ENV !== 'production')
            Sentry.init({ dsn: "https://092f990227db4c81b121d898afcd93dc@sentry.io/5189172" });

        getCurrentUser(dispatch);

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
                className={classes.root}
            >
                <ErrorBoundary>
                    <Navbar />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Notifier />
                </ErrorBoundary>
                <ErrorBoundary>
                    <main
                        className={classes.main}
                        children={props.children}
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    <FooterComponent />
                </ErrorBoundary>
            </div>
        </ThemeProvider>
    );
}
