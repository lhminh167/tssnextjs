import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, TablePagination } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import { IRootState } from "../../root/root.model";
import BrandPicker from "../../shared/brand-picker/brand-picker.component";
import ColorPicker from "../../shared/color-picker/color-picker.component";
import { defaultRowsPerPageOptions } from "../../shared/crud/crud.model";
import { defaultAttributeValue, IAttributeValue } from "../../shared/models/attribute-value.model";
import { IProduct } from "../../shared/models/product.model";
import PaginationComponent, { PaginationProps } from "../../shared/pagination/pagination.component";
import ProductListComponent from "../../shared/product-list/product-list.component";
import SizePicker from "../../shared/size-picker/size-picker.component";
import { defaultIsDescendingOptions, defaultProductSearchRequest, defaultSortByOptions, IProductFilterCategory, IProductSearchRequest, ProductFilterFilterEnum } from "./product-filter.model";
import { mb2, mr, mb } from "../../shared/layout/layout.style";
import { formatCurrency } from "../../shared/helpers/string.helper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        expansionPanelDetails: {
            display: 'inline-block',
        },
        expansionPanelActions: {
            justifyContent: 'center'
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        button: {
            minWidth: '122.25px !important'
        },
        mb2: mb2,
        mr: mr,
        mb: mb,
    })
);

interface IProps {
}

export default function ProductFilterComponent({

}: IProps) {
    const classes = useStyles({});
    const router = useRouter();
    const [color, setColor] = useState(defaultAttributeValue);
    const [size, setSize] = useState(defaultAttributeValue);
    const [category, setCategory] = useState<string[]>([]);
    const [price, setPrice] = useState<number[]>([
        defaultProductSearchRequest.minPrice,
        defaultProductSearchRequest.maxPrice
    ]);
    const [sortBy, setSortBy] = useState<string>(defaultSortByOptions[0].value);
    const [isDescending, setIsDescending] = useState<boolean>(defaultIsDescendingOptions[0].value);
    const choice = useSelector<IRootState, IProductSearchRequest>(
        state => state.productFilter.choice
    );
    const colors = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter ?.data ?.attributes.filter(a => a.name === ProductFilterFilterEnum.Color)
    );
    const sizes = useSelector<IRootState, IAttributeValue[]>(
        state => state.productFilter.filter ?.data ?.attributes.filter(a => a.name === ProductFilterFilterEnum.Size)
    );
    const minPrice = useSelector<IRootState, number>(
        state => state.productFilter.filter ?.data ?.minPrice
    );
    const maxPrice = useSelector<IRootState, number>(
        state => state.productFilter.filter ?.data ?.maxPrice
    );
    const categories = useSelector<IRootState, IProductFilterCategory[]>(
        state => state.productFilter.filter ?.data ?.categories
    );
    const products = useSelector<IRootState, IProduct[]>(
        state => state.productFilter.product ?.data ?.items
    );
    const count = useSelector<IRootState, number>(
        state => state.productFilter.product ?.data ?.count
    );

    const apply = () => {
        router.push({
            pathname: router.pathname,
            query: {
                ...choice,
                color: color.value,
                size: size.value,
                category,
                minPrice: price[0],
                maxPrice: price[1],
                sortBy: sortBy === "None" ? null : sortBy,
                isDescending
            }
        });
    };

    const clear = () => {
        setColor(defaultAttributeValue);
        setSize(defaultAttributeValue);
        setCategory(defaultProductSearchRequest.category);
        setPrice([
            defaultProductSearchRequest.minPrice,
            defaultProductSearchRequest.maxPrice
        ]);

        router.push({
            pathname: router.pathname,
            query: { ...defaultProductSearchRequest }
        });
    };

    function changePageIndex(
        event,
        newPageIndex: number
    ) {
        router.push({
            pathname: router.pathname,
            query: {
                ...choice,
                pageIndex: newPageIndex,
            }
        });
    }

    function changePageSize(
        event
    ) {
        router.push({
            pathname: router.pathname,
            query: {
                ...choice,
                pageSize: parseInt(event.target.value, 10),
                pageIndex: defaultProductSearchRequest.pageIndex,
            }
        });
    }

    function changePrice(
        event: any,
        newValue: number[]
    ) {
        setPrice(newValue);
    }

    // const marks = [
    //     {
    //         value: minPrice,
    //         label: formatCurrency(price[0]),
    //     },
    //     {
    //         value: maxPrice,
    //         label: formatCurrency(price[1]),
    //     },
    // ];

    function changeSortBy(
        event: any
    ) {
        setSortBy(event.target.value);
    }

    function changeIsDescending(
        event: any
    ) {
        setIsDescending(event.target.value);
    }

    function ProductFilterPaginationComponent({
        count,
        page,
        rowsPerPage,
        onChangePage
    }: PaginationProps) {
        return (
            <PaginationComponent
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={onChangePage}
                firstPageUrl={{
                    pathname: router.pathname,
                    query: {
                        ...choice,
                        pageIndex: defaultProductSearchRequest.pageIndex,
                    }
                }}
                previousPageUrl={{
                    pathname: router.pathname,
                    query: {
                        ...choice,
                        pageIndex: choice.pageIndex - 1,
                    }
                }}
                nextPageUrl={{
                    pathname: router.pathname,
                    query: {
                        ...choice,
                        pageIndex: choice.pageIndex + 1,
                    }
                }}
                lastPageUrl={{
                    pathname: router.pathname,
                    query: {
                        ...choice,
                        pageIndex: Math.max(0, Math.ceil(count / choice.pageSize) - 1),
                    }
                }}
            />
        )
    }

    return (
        <Fragment>
            <ExpansionPanel
                className={classes.mb}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Filter {count} items
                    </Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails
                    className={classes.expansionPanelDetails}
                >
                    <Grid
                        container
                    >
                        {
                            colors && colors.length > 0 &&
                            <Grid
                                item
                                xs={12}
                            // className={classes.mb}
                            >
                                <ColorPicker
                                    data={colors}
                                    state={color}
                                    output={setColor}
                                />
                            </Grid>
                        }
                        {
                            sizes && sizes.length > 0 &&
                            <Grid
                                item
                                xs={12}
                            // className={classes.mb}
                            >
                                <SizePicker
                                    data={sizes}
                                    output={setSize}
                                    state={size}
                                />
                            </Grid>

                        }
                        <Grid
                            item
                            xs={12}
                            className={classes.mb2}
                        >
                            <Typography gutterBottom>
                                Price range
                            </Typography>
                            <Slider
                                value={price}
                                onChange={changePrice}
                                valueLabelDisplay="auto"
                                max={maxPrice}
                                min={minPrice}
                                // marks={marks}
                                step={0.01}
                                aria-labelledby="continuous-slider"
                            />
                            <Grid
                                container
                                justify="space-between"
                            >
                                <Grid item>
                                    {formatCurrency(price[0])}
                                </Grid>
                                <Grid item>
                                    {formatCurrency(price[1])}
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            categories && categories.length > 0 &&
                            <Grid
                                item
                                xs={12}
                                className={classes.mb2}

                            >
                                <BrandPicker
                                    data={categories}
                                    output={setCategory}
                                    state={category}
                                />
                            </Grid>
                        }
                        <Grid
                            item
                            xs={12}
                            className={classes.mb}

                        >
                            <FormControl
                                className={classes.mr}
                            >
                                <InputLabel
                                >
                                    Sort By
                                </InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={changeSortBy}
                                    fullWidth
                                >
                                    {defaultSortByOptions.map(entry => (
                                        <MenuItem
                                            key={entry.value}
                                            value={entry.value}
                                        >
                                            {entry.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel
                                >
                                    Sort Order
                                </InputLabel>
                                <Select
                                    value={isDescending}
                                    onChange={changeIsDescending}
                                    fullWidth
                                >
                                    {defaultIsDescendingOptions.map(entry => (
                                        <MenuItem
                                            key={entry.value}
                                            value={entry.value}
                                        >
                                            {entry.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions className={classes.expansionPanelActions}>
                    <Fab
                        variant="extended"
                        color="primary"
                        className={classes.button}
                        onClick={apply}
                    >
                        Apply
                    </Fab>
                    <Button
                        color="primary"
                        className={classes.button}
                        onClick={clear}
                    >
                        <ClearIcon
                            className={classes.extendedIcon}
                        />
                        Clear All
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
            <ProductListComponent
                data={products}
            />
            <TablePagination
                rowsPerPageOptions={defaultRowsPerPageOptions}
                component="div"
                count={count}
                rowsPerPage={choice.pageSize}
                page={choice.pageIndex}
                onChangePage={changePageIndex}
                onChangeRowsPerPage={changePageSize}
                ActionsComponent={ProductFilterPaginationComponent}
            />
        </Fragment>
    );
}
