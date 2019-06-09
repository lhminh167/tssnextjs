import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fragment } from 'react';
import Navbar from '../navbar/navbar.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  }),
);

function Layout(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <Navbar />
      <main>
        <Container maxWidth="lg">
          {props.children}
        </Container>
      </main>
    </Fragment>
  );
}


export default Layout
