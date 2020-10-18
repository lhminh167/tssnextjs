import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { mt } from '../../shared/layout/layout.style';
import { DESCRIPTION, SUBMIT } from '../../shared/tag/tag.model';

const useStyles = makeStyles(theme => ({
    mt: mt
}));

export interface SuccessComponentProps {
    success: boolean;
    title: string;
}

export const defaultSuccessComponentProps: SuccessComponentProps = {
    success: false,
    title: 'Done!',
}

interface Props {
    confirmText: string;
    onConfirm: any;
    title: string;
}

export default function SuccessComponent({
    confirmText,
    onConfirm,
    title
}: Props) {
    const classes = useStyles({});

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12}
                className={classes.mt}
            >
                <Typography component='h1' variant='h6'
                    data-cy={DESCRIPTION}
                >
                    {title}
                </Typography>
            </Grid>
            {
                confirmText &&
                <Grid item xs={12}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={onConfirm}
                        data-cy={SUBMIT}
                    >
                        {confirmText}
                    </Button>
                </Grid>
            }
        </Grid >
    );
}
