import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IRootState } from '../../root/root.model';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 100,
        position: 'absolute',
        background: '#ffffffa3',
    },
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',

    },
    progress: {
        margin: `${theme.spacing(3)}px auto`,
        display: 'block'
    },
    button: {
        display: 'block'
    },
}));

function Loader(props) {
    const classes = useStyles(props);
    const state = useSelector(state => state.mainLoader.isLoading);
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

    if (state.mainLoader.isLoading) return (

        <Container className={classes.root}>
            <div className={classes.container}>
                <CircularProgress className={classes.progress} color="primary" />
                {/* <Button variant="contained" className={classes.button}
                onClick={handleClick}>
                    Cancel
                </Button> */}
            </div>
        </Container>

    );
    else return null;
}

export default Loader;
