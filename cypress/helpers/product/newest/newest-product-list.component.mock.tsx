import { Typography } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import React, { useState } from "react";
import { IProductSearchRequest, defaultProductSearchRequest, SortByEnum } from "../../../../modules/product/filter/product-filter.model";
import { getProducts } from "../../../../modules/product/filter/product-filter.service";
import { PaginatedList, defaultRowsPerPageOptions } from "../../../../modules/shared/crud/crud.model";
import GalleryHeaderComponent from "../../../../modules/shared/gallery-header/gallery-header.component";
import { IProduct } from "../../../../modules/shared/models/product.model";
import PaginationComponent from "../../../../modules/shared/pagination/pagination.component";
import ProductListComponent from "../../../../modules/shared/product-list/product-list.component";
import { NewIcon } from "../../../../modules/shared/svg/svg.component";
import { NEWEST } from "../../../../modules/shared/tag/tag.model";
import { paginateData } from "../../shared/pagination/pagination.component.spec";

interface Props {
    data: PaginatedList<IProduct>;
}

export default function NewestProductListComponentMock({
    data
}: Props) {
    const [state, setState] = useState<PaginatedList<IProduct>>({
        ...data,
        items: data.items.slice(0, 8),
        pageSize: 8
    });

    async function changePageIndex(
        event,
        newPageIndex: number
    ) {
        const newState: PaginatedList<IProduct> = paginateData(data, state.pageSize, newPageIndex);
        setState(newState);
    }

    async function changePageSize(
        event
    ) {
        const newPageSize = parseInt(event.target.value, 10);
        const newPageIndex = defaultProductSearchRequest.pageIndex;

        const newState: PaginatedList<IProduct> = paginateData(data, newPageSize, newPageIndex);
        setState(newState);
    }

    return (
        <article
            data-cy={NEWEST}
        >
            <GalleryHeaderComponent
                title={
                    <Typography variant='h6' component='h2'>
                        Newest Arrivals
                    </Typography>
                }
                titleIcon={
                    <NewIcon
                        color='primary'
                        style={{
                            fontSize: '4rem'
                        }}
                    />
                }
            // seeMore={
            //     <Link
            //         href='/product'
            //         as='/product'
            //         passHref
            //     >
            //         <Button
            //             component='a'
            //         >
            //             See All Newest Products
            //         </Button>
            //     </Link>
            // }
            />
            <ProductListComponent
                data={state.items}
            />
            <TablePagination
                rowsPerPageOptions={defaultRowsPerPageOptions}
                component='div'
                count={state.count}
                rowsPerPage={state.pageSize}
                page={state.pageIndex}
                onChangePage={changePageIndex}
                onChangeRowsPerPage={changePageSize}
                ActionsComponent={PaginationComponent}
                labelRowsPerPage='Items per page:'
            />
        </article>
    );
}

