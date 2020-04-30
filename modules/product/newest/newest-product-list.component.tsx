import { Button, createStyles, makeStyles, TablePagination, Theme, Typography } from "@material-ui/core";
import Link from "next/link";
import { Fragment, useState } from "react";
import { defaultRowsPerPageOptions, PaginatedList } from "../../shared/crud/crud.model";
import GalleryHeaderComponent from "../../shared/gallery-header/gallery-header.component";
import { IProduct } from "../../shared/models/product.model";
import PaginationComponent from "../../shared/pagination/pagination.component";
import ProductListComponent from "../../shared/product-list/product-list.component";
import { defaultProductSearchRequest, IProductSearchRequest, SortByEnum } from "../filter/product-filter.model";
import { getProducts } from "../filter/product-filter.service";
import { NewIcon } from "../../shared/svg/svg.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

interface Props {
    data: PaginatedList<IProduct>;
}

export default function NewestProductList({
    data
}: Props) {
    const classes = useStyles({});
    const [state, setState] = useState<PaginatedList<IProduct>>(data);
    const [choice, setChoice] = useState<IProductSearchRequest>({
        ...defaultProductSearchRequest,
        sortBy: SortByEnum.Newest
    });

    async function changePageIndex(
        event,
        newPageIndex: number
    ) {
        const newChoice: IProductSearchRequest = {
            ...choice,
            pageIndex: newPageIndex,
        }
        const response = await getProducts(newChoice);
        setState(response.content);
        setChoice(newChoice);
    }

    async function changePageSize(
        event
    ) {
        const newChoice: IProductSearchRequest = {
            ...choice,
            pageSize: parseInt(event.target.value, 10),
            pageIndex: defaultProductSearchRequest.pageIndex,
        };
        const response = await getProducts(newChoice);
        setState(response.content);
        setChoice(newChoice);
    }

    return (
        <Fragment>
            <GalleryHeaderComponent
                title={
                    <Typography variant="h6" component="h2">
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
                seeMore={
                    <Link
                        href="/product"
                        as="/product"
                        passHref
                    >
                        <Button
                            component="a"
                        >
                            See All Newest Products
                        </Button>
                    </Link>
                }
            />
            <ProductListComponent
                data={state.items}
            />
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
        </Fragment>
    );
}

