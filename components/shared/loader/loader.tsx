import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function Loader(props) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} color="secondary" />
        </div>
    );
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);