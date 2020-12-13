import { Grid, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { bgWhite, mt, mtAuto, p } from '../layout/layout.style';
import { FOOTER } from '../tag/tag.model';


const useStyles = makeStyles((theme) => ({
    bgWhite: bgWhite,
    p: p,
    mt: mt,
    mtAuto: mtAuto
}));

export default function FooterComponent(props) {
    const classes = useStyles();

    return (
        <Paper
            component='footer'
            className={classes.bgWhite + ' ' + classes.mtAuto}
            data-cy={FOOTER}
        >
            <Container
                className={classes.p}
            >
                <Grid
                    container
                >
                    <Grid
                        xs={12}
                        item
                    >


                    </Grid>
                    <Grid
                        item
                        xs
                    >
                        <Grid
                        >
                            <Link
                                href={{
                                    pathname: '/'
                                }}
                                as={`/user`}
                                passHref
                            >

                                <Typography
                                    variant='body2'
                                    component='p'
                                    color='textSecondary'
                                    align='center'
                                >
                                    {`© ${new Date().getFullYear()} ${process.env.SITE_NAME.toLowerCase()} Ltd`}
                                </Typography>
                            </Link>

                        </Grid>

                    </Grid>

                </Grid>
            </Container>
        </Paper>
    );
}
