import { Fragment } from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

interface Props {
    backButtonText: string;
    nextButtonText: string;
    back: any;
    next: any;
}

export default function ActionButtonsComponent({ backButtonText, nextButtonText, back, next }: Props) {
    return (
        <Grid
            container
            justify="space-between"

        >
            <Fab
                variant="extended"
                onClick={back}
            >
                {backButtonText}
            </Fab>
            <Fab
                variant="extended"
                color="primary"
                onClick={next}
            >
                {nextButtonText}
            </Fab>
        </Grid>
    )
}