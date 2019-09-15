import IconButton from '@material-ui/core/IconButton';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import React from 'react';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // paddingLeft: theme.spacing(2),
            // paddingRight: theme.spacing(1),
        },
        highlight: {},
            // theme.palette.type === 'light'
            //     ? {
            //         color: theme.palette.secondary.main,
            //         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            //     }
            //     : {
            //         color: theme.palette.text.primary,
            //         backgroundColor: theme.palette.secondary.dark,
            //     }
        spacer: {
            // flex: '1 1 100%',
        },
        actions: {
            // color: theme.palette.text.secondary,
        },
        title: {
            // flex: '0 0 auto',
        },
    }),
);

interface EnhancedTableToolbarProps {
    numOfItems: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles({});
    const {numOfItems} = props;

    return (
        <Toolbar
            className={classes.root}
        >
            <div className={classes.title}>

                <Typography variant="h6" id="tableTitle">
                    {numOfItems} Items In Your Cart
                </Typography>

            </div>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;