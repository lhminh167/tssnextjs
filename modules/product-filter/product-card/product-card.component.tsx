import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IProductFilterProduct } from '../product-filter.model';
import { env } from '../../shared/config/config';
import Image from '../../shared/image/image';
import { Theme, Fab } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            // paddingTop: theme.spacing(3),
        },
        cardContent: {
        },
        cardActions: {
            justifyContent: "center",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        },
    }),
);

interface Props {
    input: IProductFilterProduct;
}

function ProductCard(props: Props) {
    const classes = useStyles(props);
    const { input } = props;

    return (
        <Fragment>
            <Card>
                <CardActionArea className={classes.root}>
                    <CardMedia>
                        <Image
                            imageName={input.thumbnail}
                            imageStyles={{
                                width: "100%"
                            }}
                        />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="subtitle1" gutterBottom>
                            {input.name}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            {input.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Fab variant="extended" color="primary" size="small">
                        Add To Cart
                    </Fab>
                </CardActions>
            </Card >
        </Fragment>
    );
}

export default ProductCard;
