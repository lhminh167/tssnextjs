import { ButtonBase, createStyles, GridListTileBar, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Fragment } from 'react';
import { formatCurrency } from '../../shared/helpers/string.helper';
import ImageComponent from '../../shared/image/image.component';
import { w100 } from '../../shared/layout/layout.style';
import { themeColor } from '../../shared/layout/layout.theme';
import { IProduct } from '../../shared/models/product.model';
import { TOP_PANEL_PRODUCT_LINK, DISCOUNTED_PRICE } from '../../shared/tag/tag.model';
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

export default function TopPanelProductCard({
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
                    data-cy={TOP_PANEL_PRODUCT_LINK}
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
                title={data.name}
                subtitle={
                    <Fragment>
                        <Typography
                            component='h3'
                            variant='subtitle1'
                            data-cy={DISCOUNTED_PRICE}
                        >
                            {formatCurrency(data.discountedPrice ?? data.price)}
                        </Typography>
                    </Fragment>
                }
            />
        </Fragment>
    );
}