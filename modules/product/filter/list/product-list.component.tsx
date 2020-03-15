import { GridList, GridListTile } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../root/root.model";
import { IProduct } from "../../../shared/models/product.model";
import ProductCard from "../card/product-card.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridList: {
            marginTop: theme.spacing(3),
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: "translateZ(0)"
        },
        gridListTile: {
            boxShadow:
                "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
        }
    })
);

interface IProps {
    data: IProduct[]
}

export default function ProductFilterProductListComponent({
    data
}: IProps) {
    const classes = useStyles({});
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <GridList
            cellHeight={"auto"}
            className={classes.gridList}
            cols={matches ? 4 : 2}
        >
            {
                data && data.length && data.map(tile => (
                    <GridListTile
                        key={tile.thumbnail}
                        classes={{ tile: classes.gridListTile }}
                    >
                        <ProductCard key={tile.thumbnail} data={tile} />
                    </GridListTile>
                ))}
        </GridList>
    );
}
