import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment } from "react";
import Navbar from "../navbar/navbar.component";
import { transitionWidth } from "./layout.theme";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import Notifier from "../notifier/notifier.component";
import FooterComponent from "../footer/footer.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: theme.spacing(18),
            [theme.breakpoints.up(transitionWidth)]: {
                marginTop: theme.spacing(12)
            }
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

    return (
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
                <main className={classes.main} children={props.children} />
            </ErrorBoundary>
            <ErrorBoundary>
                <FooterComponent />
            </ErrorBoundary>
        </div>
    );
}
