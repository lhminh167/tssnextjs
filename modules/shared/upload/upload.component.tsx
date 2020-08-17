import { Button, Grid, InputLabel, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
    },
    container: {
        // border: '1px solid',
        // borderRadius: theme.shape.borderRadius
    }
}));

interface Props {
    data: File;
    output: any;
    buttonText: string;
    accept: string;
    name: string;
}

export default function UploadComponent({
    data,
    output,
    buttonText,
    accept,
    name

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
            className={classes.container}
        >
            <input
                accept={accept}
                className={classes.input}
                id={name}
                name={name}
                type='file'
                onChange={change}
            />
            <Grid item
                component={InputLabel}
                htmlFor={name}

            >
                <Button
                    variant='outlined'
                    component='span'
                    size='large'
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
