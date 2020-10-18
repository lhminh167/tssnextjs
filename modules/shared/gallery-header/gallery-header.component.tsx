import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        titleBar: {
            margin: '2rem 0 1rem'
        },
        autoWidth: {
            width: 'auto'
        },
        titleIcon: {
            marginRight: '0.5rem'
        },
        alignItemsCenter: {
            alignItems: 'center'
        }
    }),
);

interface Props {
    title?: any;
    titleIcon?: any;
    seeMore?: any;
    customTitle?: any;
}

export default function GalleryHeaderComponent({
    title,
    titleIcon,
    seeMore,
    customTitle
}: Props) {
    const classes = useStyles({});

    return (
        <Fragment>
            {
                (title || titleIcon || seeMore)
                &&
                <Grid container item
                    xs={12}
                    justify='space-between'
                    className={classes.titleBar}
                >
                    <Grid
                        className={classes.autoWidth}
                        container
                        item
                        alignItems='center'
                    >
                        <Grid
                            className={
                                classes.titleIcon + ' ' + classes.alignItemsCenter
                            }
                            data-cy={'GalleryTitleIcon'}
                        >
                            {titleIcon}
                        </Grid>
                        <Grid
                            className={
                                classes.alignItemsCenter
                            }
                            data-cy={'GalleryTitle'}
                        >
                            {title}
                        </Grid>
                    </Grid>
                    {
                        seeMore
                    }
                </Grid>
            }
            {
                customTitle
            }
        </Fragment>
    );
}