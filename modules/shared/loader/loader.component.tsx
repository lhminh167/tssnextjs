import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 100,
    position: "absolute",
    background: "#ffffffa3",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  progress: {
    margin: `${theme.spacing(3)} auto`,
    display: "block",
  },
  button: {
    display: "block",
  },
}));

function Loader(props: any) {
  const classes = useStyles(props);
  // const isLoading = useSelector((state: IRootState) => state.mainLoader.isLoading);
  const isLoading = false;
  const dispatch = useDispatch();

  // useEffect(() => {

  //     setTimeout(() => {
  //         dispatch(hideMainLoader())
  //     }, 10000);

  //     return () => { return; };
  // }, [])

  // function handleClick() {
  //     dispatch(hideMainLoader())
  // }

  if (isLoading)
    return (
      <Container className={classes.root}>
        <div className={classes.container}>
          <CircularProgress className={classes.progress} color="primary" />
          {/* <Button variant='contained' className={classes.button}
                onClick={handleClick}>
                    Cancel
                </Button> */}
        </div>
      </Container>
    );
  else return null;
}

export default Loader;
