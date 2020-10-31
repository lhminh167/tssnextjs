import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginatedList } from '../../shared/crud/crud.model';
import { failed, idle, pending, succeeded } from '../../shared/crud/crud.reducer';
import { crudInitialState, paginatedInitialState } from '../../shared/crud/crud.state';
import { IProduct } from '../../shared/models/product.model';
import { defaultProductSearchRequest, IProductFilterFilter, IProductFilterState, IProductSearchRequest, apiProductUrl, filterInitialData } from './product-filter.model';

const productFilterInitialState: IProductFilterState = {
    filter: crudInitialState(filterInitialData),
    product: paginatedInitialState([]),
    choice: defaultProductSearchRequest
};

export default createSlice({
    name: apiProductUrl.product,
    initialState: productFilterInitialState,
    reducers: {
        getFilterPending: (state: IProductFilterState) => {
            pending(state.filter);
        },
        getFilterSucceeded: (state: IProductFilterState, action: PayloadAction<IProductFilterFilter>) => {
            state.filter.data = action.payload;
            succeeded(state.filter);
        },
        getFilterFailed: (state: IProductFilterState, action: PayloadAction<IProductFilterFilter>) => {
            failed(state.filter, action);
        },
        getFilterIdle: (state: IProductFilterState) => {
            idle(state.filter, productFilterInitialState.filter);
        },
        getProductsPending: (state: IProductFilterState, action: PayloadAction<IProductSearchRequest>) => {
            // state.choice = action.payload;
            // pending(state.product);
            return {
                ...state,
                choice: {
                    ...action.payload
                },
                product: {
                    ...state.product,
                    isLoading: true,
                    error: null
                }
            }
        },
        getProductsSucceeded: (state: IProductFilterState, action: PayloadAction<PaginatedList<IProduct>>) => {
            state.product.data = action.payload;
            succeeded(state.product);
        },
        getProductsFailed: (state: IProductFilterState, action: PayloadAction<PaginatedList<IProduct>>) => {
            failed(state.product, action);
        },
        getProductsIdle: (state: IProductFilterState) => {
            idle(state.product, productFilterInitialState.product);
        },


        apply: (state: IProductFilterState, action: PayloadAction<IProductSearchRequest>) => {
            state.choice = action.payload;
        },
        changeKeyword: (state: IProductFilterState, action: PayloadAction<string>) => {
            state.choice.keyword = action.payload;
        },
    }
});
