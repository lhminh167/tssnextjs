import { Button, Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { UPLOAD_BUTTON, UPLOAD, UPLOAD_INPUT } from '../tag/tag.model';


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    },
}));

interface Props {
    data: File;
    output: any;
    buttonText: string;
    accept: string;
    name: string;
    testId?: string;
}

export default function UploadComponent({
    data,
    output,
    buttonText,
    accept,
    name,
    testId
}: Props) {
    const classes = useStyles({});

    function change(event) {
        output(event);
    }

    return (
        <Grid
            container
            direction='row'
            alignItems='center'
            spacing={2}
            data-cy={testId ?? UPLOAD}
        >
            <input
                accept={accept}
                className={classes.input}
                id={name}
                name={name}
                type='file'
                onChange={change}
                data-cy={UPLOAD_INPUT}
            />
            <Grid item
                component={InputLabel}
                htmlFor={name}

            >
                <Button
                    variant='outlined'
                    component='span'
                    size='large'
                    data-cy={UPLOAD_BUTTON}
                >
                    {buttonText ?? 'Chose File'}
                </Button>
            </Grid>
            <Grid item>
                <Typography>
                    {data?.name}
                </Typography>
            </Grid>
        </Grid>
    );
}
