import { Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../root/root.model';
import { toNumber } from '../../../shared/helpers/auth.helper';
import { bold, mb2, mr, mt } from '../../../shared/layout/layout.style';
import { IReview } from '../../../shared/models/review.model';
import ProductReviewDeleteComponent from '../delete/product-review-delete.component';
import ProductReviewEditComponent from '../edit/product-review-edit.component';
import ProductReviewComponent from './product-review.component';
import { EDIT } from '../../../shared/tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: bold,
        mb2: mb2,
        mt: mt,
        mr: mr
    }),
);

interface Props {
    data: IReview;
    onUpdate: any;
    onRemove: any;
}

export default function ProductReviewDetailComponent({
    data,
    onUpdate,
    onRemove
}: Props) {
    const classes = useStyles({});
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const isAdmin = useSelector<IRootState, boolean>(
        state => state.currentUser.data.role === 'Admin'
    );
    const isCreator = useSelector<IRootState, boolean>(
        state => toNumber(state.currentUser.data.customerId) === data.customerId
    );

    function update() {

        setIsEditMode(false);
        onUpdate();
    }
    return (
        <Grid
            item
            container
            component='li'
            xs={12}
            key={data.reviewId}
            className={classes.mb2}
        >
            {
                !isEditMode &&
                <ProductReviewComponent
                    data={data}
                />
            }
            {
                !isEditMode && (isCreator || isAdmin) &&
                <Grid
                    container
                    item
                    xs={12}
                    className={classes.mt}
                >
                    <Grid
                        item
                        xs={12}
                        sm={4}
                    >
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                    >
                        <Button
                            variant='outlined'
                            onClick={() => { setIsEditMode(true) }}
                            className={classes.mr}
                            data-cy={EDIT}
                        >
                            Edit
                        </Button>
                        <ProductReviewDeleteComponent
                            data={data}
                            output={onRemove}
                        />
                    </Grid>
                </Grid>
            }
            {
                isEditMode &&
                <Grid item xs={12}>
                    <ProductReviewEditComponent
                        data={data}
                        output={update}
                        close={() => { setIsEditMode(false) }}
                    />
                </Grid>
            }
        </Grid>
    );
}
