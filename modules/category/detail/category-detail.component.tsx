import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ProductDetailImageComponent from '../../product/detail/product-detail-image.component';
import { ICategory } from '../../shared/models/category.model';
import { CATEGORY, DESCRIPTION, NAME } from '../../shared/tag/tag.model';

interface IProps {
    data: ICategory,
}

export default function CategoryDetailComponent({
    data
}: IProps) {

    return (
        <Grid container
            component={Paper}
            spacing={2}
            data-cy={CATEGORY}
        >
            {
                data.product.items.length &&
                <Grid item xs={12} sm={5}>
                    <ProductDetailImageComponent
                        data={data.product.items[0]}
                    />
                </Grid>
            }
            <Grid
                item
                xs={12}
                sm={7}
            >
                <Grid item xs={12}>
                    <Typography
                        component='h1'
                        variant='h5'
                        gutterBottom
                        data-cy={NAME}
                        color='primary'
                    >
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component='p'
                        variant='subtitle2'
                        gutterBottom
                        data-cy={DESCRIPTION}
                    >
                        {data.description}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
