import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useReduxState, useReduxDispatch } from 'reactive-react-redux';
import Button from "@material-ui/core/Button";
import {hideMainLoader} from './loader.redux'
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '100',
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
    const classes = useStyles();
    const state = useReduxState();
    const dispatch = useReduxDispatch();

    // useEffect(() => {

    //     setTimeout(() => { 
    //         dispatch(hideMainLoader())
    //     }, 10000);

    //     return () => { return; };
    // }, [])

    // function handleClick() {
    //     dispatch(hideMainLoader())
    // }

    if (state.isLoading) return (
        <Container className={classes.root} spacing={2}>
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
