import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { bgGrey, p } from "../layout/layout.style";

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
    nextButtonDisabled?: boolean
}

export default function ActionButtonsComponent({
    backButtonText,
    nextButtonText,
    back,
    next,
    nextButtonDisabled
}: Props) {
    const classes = useStyles({});

    return (
        <Grid
            container
            justify="space-between"
            className={classes.p + ' ' + classes.bgGrey}
        >
            {
                backButtonText &&
                <Fab
                    variant="extended"
                    onClick={back}
                >
                    {backButtonText}
                </Fab>
            }
            {
                nextButtonText &&
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={next}
                    disabled={nextButtonDisabled}
                >
                    {nextButtonText}
                </Fab>
            }
        </Grid>
    )
}