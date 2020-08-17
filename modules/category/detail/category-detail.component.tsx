import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICategory } from '../../shared/models/category.model';
import ProductDetailImageComponent from '../../product/detail/product-detail-image.component';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

interface IProps {
    data: ICategory,
}

export default function CategoryDetailComponent({
    data
}: IProps) {
    const classes = useStyles({});

    return (
        <Grid container
            component={Paper}
            spacing={2}
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
                    >
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component='p'
                        variant='subtitle2'
                        gutterBottom
                    >
                        {data.description}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
