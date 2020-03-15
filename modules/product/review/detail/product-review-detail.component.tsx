import { Button, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../root/root.model";
import { getRole, toNumber } from "../../../shared/helpers/auth.helper";
import { IReview } from "../../../shared/models/review.model";
import ProductReviewDeleteComponent from "../delete/product-review-delete.component";
import ProductReviewEditComponent from "../edit/product-review-edit.component";
import ProductReviewComponent from "./product-review.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 'bold'
        }
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
        state => getRole(state.currentUser.data) === "Admin"
    );
    const isCreator = useSelector<IRootState, boolean>(
        state => toNumber(state.currentUser.data.customerId) === data.customerId
    );

    return (
        <Grid item container
            component="li"
            xs={12}
            key={data.reviewId}
        >
            {
                !isEditMode &&
                <ProductReviewComponent
                    data={data}
                />
            }
            {
                !isEditMode && (isCreator || isAdmin) &&
                <Grid item xs={6}>
                    <Button
                        onClick={() => { setIsEditMode(true) }}
                    >
                        Edit
                    </Button>
                    <ProductReviewDeleteComponent
                        data={data}
                        output={onRemove}
                    />
                </Grid>
            }
            {
                isEditMode &&
                <Grid item xs={12}>
                    <ProductReviewEditComponent
                        data={data}
                        output={onUpdate}
                        close={() => { setIsEditMode(false) }}
                    />
                </Grid>
            }
        </Grid>
    );
}
