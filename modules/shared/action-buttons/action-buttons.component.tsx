import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { bgGrey, p } from '../layout/layout.style';
import { SUBMIT, BACK } from '../tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        p: p,
        bgGrey: bgGrey
    })
);

interface Props {
    backButtonText?: string;
    nextButtonText?: string;
    back?: any;
    next?: any;
    nextButtonDisabled?: boolean;
    backDataTestId?: string;
    nextDataTestId?: string;

}

export default function ActionButtonsComponent({
    backButtonText,
    nextButtonText,
    back,
    next,
    nextButtonDisabled,
    backDataTestId,
    nextDataTestId
}: Props) {
    const classes = useStyles({});

    return (
        <Grid
            container
            justify='space-between'
            className={classes.p + ' ' + classes.bgGrey}
        >
            {
                backButtonText &&
                <Fab
                    variant='extended'
                    onClick={back}
                    data-cy={backDataTestId ?? BACK}
                >
                    {backButtonText}
                </Fab>
            }
            {
                nextButtonText &&
                <Fab
                    variant='extended'
                    color='primary'
                    onClick={next}
                    disabled={nextButtonDisabled}
                    data-cy={nextDataTestId ?? SUBMIT}
                >
                    {nextButtonText}
                </Fab>
            }
        </Grid>
    )
}