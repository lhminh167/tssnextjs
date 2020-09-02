import { Backdrop, CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { ReactNode } from 'react';
import { NO, YES } from '../tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.modal + 1,
        },
    }),
);

export interface Props {
    title?: string;
    content?: ReactNode;
    confirmText?: string;
    declineText?: string;
    open: boolean;
    close: any;
    confirm: any;
    decline: any;
    isLoading?: boolean;
    confirmTestId?: string,
    declineTestId?: string
}

export function ConfirmationDialog({
    title,
    content,
    confirmText,
    declineText,
    open,
    close,
    confirm,
    decline,
    isLoading,
    confirmTestId,
    declineTestId
}: Props) {
    const classes = useStyles({});
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth='xs'
            open={open}
        >
            <Backdrop
                className={classes.backdrop}
                open={isLoading ?? false}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <DialogTitle
                disableTypography
            >
                <Grid
                    container
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                >
                    <Grid
                        item
                    >
                        <Typography
                            variant='h6'
                        >
                            {
                                title ?? 'Confirmation'
                            }
                        </Typography>
                    </Grid>
                    <Grid
                        item
                    >
                        {close &&
                            <IconButton
                                onClick={close}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers>
                {
                    content ?? 'To confirm this action, please click the "Ok" button.'
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus
                    onClick={decline}
                    color='primary'
                    data-cy={declineTestId ?? YES}
                >
                    {
                        declineText ?? 'Cancel'
                    }
                </Button>
                <Button onClick={confirm} color='primary'
                    data-cy={confirmTestId ?? NO}
                >
                    {
                        confirmText ?? 'Ok'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}

