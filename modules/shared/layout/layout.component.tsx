import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fragment } from 'react';
import Navbar from '../navbar/navbar.component';
import { transitionWidth } from './layout.theme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: theme.spacing(14),
            [theme.breakpoints.up(transitionWidth)]: {
                marginTop: theme.spacing(8)
            },
        },
    }),
);

function Layout(props) {
    const classes = useStyles(props);

    return (
        <Fragment>
            <Navbar />
            <main className={classes.main} children={props.children} />
        </Fragment>
    );
}

export default Layout
