import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fragment } from 'react';
import Navbar from '../navbar/navbar.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  }),
);

function Layout(props) {
  const classes = useStyles(props);

  return (
    <Fragment>
      <Navbar />
      <main>
        <Container maxWidth="lg" className={classes.root}>
          {props.children}
        </Container>
      </main>
    </Fragment>
  );
}


export default Layout
