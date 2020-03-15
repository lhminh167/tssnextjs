import { Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { toUrl } from '../../../shared/helpers/string.helper';
import Image from '../../../shared/image/image';
import { IProduct } from '../../../shared/models/product.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center"
        },
        cardActions: {
            justifyContent: "center",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        },
    }),
);

interface IProps {
    data: IProduct;
}

function ProductCard(props: IProps) {
    const classes = useStyles(props);
    const { data } = props;

    return (
        <Card>
            <Link
                href={{
                    pathname: 'product/[productName]',
                    query: {
                        productId: data.productId
                    }
                }}
                as={`product/${toUrl(data.name)}?productId=${data.productId}`}
                passHref
            >
                <Typography
                    component="a"
                    color="inherit"
                >
                    <CardActionArea className={classes.root}>
                        <CardMedia>
                            <Image
                                imageName={data.thumbnail}
                                imageStyles={{
                                    width: "100%"
                                }}
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                                {data.name}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                                {data.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Typography>
            </Link>
        </Card >
    );
}

export default ProductCard;
