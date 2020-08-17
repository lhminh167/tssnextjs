import { ButtonBase, createStyles, GridListTileBar, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Fragment } from 'react';
import { formatCurrency, toUrl } from '../../shared/helpers/string.helper';
import Image from '../../shared/image/image';
import { themeColor } from '../../shared/layout/layout.theme';
import { IProduct } from '../../shared/models/product.model';
import { w100 } from '../../shared/layout/layout.style';
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
                >
                    <Image
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
                        >
                            {formatCurrency(data.discountedPrice ?? data.price)}
                        </Typography>
                        {/* {
                            data.discountedPrice &&
                            <Typography
                                variant='subtitle2'
                                component='s'
                            >
                                {formatCurrency(data.price)}
                            </Typography>
                        } */}
                    </Fragment>
                }
            />
        </Fragment>
    );
}