import { createStyles, Grid, TablePagination, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { defaultRowsPerPageOptions, PaginatedList } from '../../../shared/crud/crud.model';
import { themeColor } from '../../../shared/layout/layout.theme';
import { IProduct } from '../../../shared/models/product.model';
import { defaultReviewGetRequest, IReview, IReviewGetRequest, IReviewGetResponse } from '../../../shared/models/review.model';
import PaginationComponent from '../../../shared/pagination/pagination.component';
import { defaultProductSearchRequest } from '../../filter/product-filter.model';
import CreateReviewComponent from '../create/create-product-review.component';
import ProductReviewDetailComponent from '../detail/product-review-detail.component';
import { getReviews } from '../review.service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 'bold'
        },
        card: {
            padding: theme.spacing(2),
            background: themeColor.secondaryGrey
        }
    }),
);

interface Props {
    data: IProduct;
}

export default function ProductReviewListComponent({
    data
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<IReviewGetResponse>(data.review);
    const [choice, setChoice] = useState<IReviewGetRequest>({ ...defaultReviewGetRequest, productId: data.productId });

    function setNewState(input: IReview[]) {
        setState({
            ...state,
            count: input.length,
            items: input
        });
    }

    function onRemove(input: IReview) {
        debugger
        const items = state.items.filter(e => e.reviewId !== input.reviewId);
        setState({
            ...state,
            count: state.count - 1,
            items: items
        });

    }

    function onUpdate(input: IReview) {
        debugger
        const index: number = state.items.findIndex(e => e.reviewId === input.reviewId);
        const newState: PaginatedList<IReview> = state;
        newState[index] = input;
        setState(newState);
    }

    function onCreate(input: IReview) {
        debugger
        if (state.pageIndex > 0) return;
        const items: IReview[] = state.items;
        if (state.items.length === state.pageSize) items.pop();
        items.unshift(input);
        setState({
            ...state,
            count: state.count + 1,
            items: items
        });

    }

    async function changePageIndex(
        event,
        newPageIndex: number
    ) {
        debugger
        const newChoice: IReviewGetRequest = {
            ...choice,
            pageIndex: newPageIndex,
        }
        const response = await getReviews(newChoice)
        setState(response.content);
        setChoice(newChoice);
    }

    async function changePageSize(
        event
    ) {
        debugger
        const newChoice: IReviewGetRequest = {
            ...choice,
            pageSize: parseInt(event.target.value, 10),
            pageIndex: defaultProductSearchRequest.pageIndex,
        }
        const response = await getReviews(newChoice);
        debugger
        setState(response.content);
        setChoice(newChoice);

    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <CreateReviewComponent
                    data={data}
                    output={onCreate}
                />
            </Grid>
            {
                state.count > 0 &&
                <Grid item xs={12}>
                    <Typography
                        component="h2"
                        variant="h6"
                        className={classes.bold}

                    >
                        Product reviews
                </Typography>
                </Grid>
            }
            <Grid item container
                component="ul"
                xs={12}
            >
                {state.items.map((entry: IReview) =>
                    <ProductReviewDetailComponent
                        key={entry.reviewId}
                        data={entry}
                        onRemove={onRemove}
                        onUpdate={onUpdate}
                    />
                )}
            </Grid>
            <TablePagination
                rowsPerPageOptions={defaultRowsPerPageOptions}
                component="div"
                count={state.count}
                rowsPerPage={choice.pageSize}
                page={choice.pageIndex}
                onChangePage={changePageIndex}
                onChangeRowsPerPage={changePageSize}
                ActionsComponent={PaginationComponent}
            />
        </Grid>
    );
}

