import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Metadata } from '../metadata/metadata.model';
import { Grid, useMediaQuery, Paper } from '@material-ui/core';
import Link from 'next/link';
import { bgWhite, p, mt, mtAuto } from '../layout/layout.style';


const useStyles = makeStyles((theme) => ({
    bgWhite: bgWhite,
    p: p,
    mt: mt,
    mtAuto: mtAuto
}));

interface Props extends Metadata {

};

export default function FooterComponent(props) {
    const classes = useStyles();

    return (
        <Paper
            component='footer'
            className={classes.bgWhite + ' ' + classes.mtAuto}
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
                                    {`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_SITE_NAME.toLowerCase()} Ltd`}
                                </Typography>
                            </Link>

                        </Grid>

                    </Grid>

                </Grid>
            </Container>
        </Paper>
    );
}
