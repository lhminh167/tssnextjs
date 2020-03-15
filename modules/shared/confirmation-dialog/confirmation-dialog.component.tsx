import { IconButton, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React, { ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            // position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        backdrop: {
            zIndex: theme.zIndex.modal + 1,
            // color: '#fff',
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
    isLoading
}: Props) {
    const classes = useStyles({});
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={open}
        >
            <Backdrop
                className={classes.backdrop}
                open={isLoading ?? false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogTitle
                disableTypography
                className={classes.root}
            >
                <Typography
                    variant="h6"
                >
                    {
                        title ?? 'Confirmation'
                    }
                </Typography>
                {close &&
                    <IconButton
                        className={classes.closeButton}
                        onClick={close}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            </DialogTitle>
            <DialogContent dividers>
                {
                    content ?? 'To confirm this action, please click the "Ok" button.'
                }
            </DialogContent>
            <DialogActions>
                <Button autoFocus
                    onClick={decline}
                    color="primary"
                >
                    {
                        declineText ?? 'Cancel'
                    }
                </Button>
                <Button onClick={confirm} color="primary">
                    {
                        confirmText ?? 'Ok'
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}

