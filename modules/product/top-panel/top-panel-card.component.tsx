import { ButtonBase, createStyles, GridListTileBar, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Fragment } from 'react';
import { formatCurrency } from '../../shared/helpers/string.helper';
import ImageComponent from '../../shared/image/image.component';
import { w100 } from '../../shared/layout/layout.style';
import { themeColor } from '../../shared/layout/layout.theme';
import { getDiscountedPrice, IProduct } from '../../shared/models/product.model';
import { PRODUCT_LINK, DISCOUNTED_PRICE, NAME, PRODUCT_CARD } from '../../shared/tag/tag.model';
import { productUrl } from '../filter/product-filter.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        discount: {
            marginRight: theme.spacing(1),
            color: themeColor.white,
            borderColor: themeColor.white
        },
        link: {
            ...w100
        }

    }),
);

interface Props {
    data: IProduct;
    imageStyles?: any;
}

export default function ProductGrid({
    data,
    imageStyles
}: Props) {
    const classes = useStyles({});
    return (
        <Fragment>
            <Link
                href={productUrl.detail(data).href}
                as={productUrl.detail(data).as}
                passHref
            >
                <ButtonBase
                    className={classes.link}
                    component='a'
                    data-cy={PRODUCT_LINK}
                >
                    <ImageComponent
                        imageName={
                            data.thumbnail
                        }
                        imageStyles={{
                            ...imageStyles,
                            height: '250px',
                        }}
                    />
                </ButtonBase>
            </Link>
            <GridListTileBar
                data-cy={PRODUCT_CARD}
                data-id={data.productId}
                title={
                    <Typography
                        component='h2'
                        variant='subtitle1'
                        data-cy={NAME}
                    >
                        {data.name}
                    </Typography>
                }
                subtitle={
                    <Typography
                        component='h3'
                        variant='subtitle1'
                        data-cy={DISCOUNTED_PRICE}
                    >
                        {getDiscountedPrice(data)}
                    </Typography>
                }
            />
        </Fragment>
    );
}