import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../shared/crud/crud.model';
import { succeeded, failed, idle, pending } from '../shared/crud/crud.reducer';
import { crudInitialState } from '../shared/crud/crud.state';
import { IProductFilterChoice, IProductFilterFilter, productFilterUrl } from './product-filter.model';
import { IProduct } from '../shared/models/product.model';

const filterInitialData: IProductFilterFilter = {
    attributes: [],
    categories: [],
};

const filterInitialState: IState<IProductFilterFilter> = crudInitialState(filterInitialData);

const choiceInitialState: IProductFilterChoice = {
    attributes: [],
    categories: [],
    minPrice: null,
    maxPrice: null,
};

const productInitialData: IProduct[] = [];

const productInitialState: IState<IProduct[]> = crudInitialState(productInitialData);

const filter = createSlice({
    name: productFilterUrl.filter,
    initialState: filterInitialState,
    reducers: {
        getPending: (state: IState<IProductFilterFilter>) => {
            pending(state);
        },
        getSucceeded: (state: IState<IProductFilterFilter>, action: PayloadAction<IProductFilterFilter>) => {
            state.data = action.payload;
            succeeded(state);
        },
        getFailed: (state: IState<IProductFilterFilter>, action: PayloadAction<IProductFilterFilter>) => {
            failed(state, action);
        },
        getIdle: (state: IState<IProductFilterFilter>) => {
            idle(state, filterInitialState);
        },
    }
});

const product = createSlice({
    name: productFilterUrl.product,
    initialState: productInitialState,
    reducers: {
        getPending: (state: IState<IProduct[]>) => {
            pending(state); 
        },
        getSucceeded: (state: IState<IProduct[]>, action: PayloadAction<IProduct[]>) => {
            state.data = action.payload;
            succeeded(state);
        },
        getFailed: (state: IState<IProduct[]>, action: PayloadAction<IProduct[]>) => {
            failed(state, action);
        },
        getIdle: (state: IState<IProduct[]>) => {
            idle(state, productInitialState);
        },
    }
});

const choice = createSlice({
    name: productFilterUrl.choice,
    initialState: choiceInitialState,
    reducers: {
        apply: (state: IProductFilterChoice, action: PayloadAction<IProductFilterChoice>) => {
            state = action.payload;
        },
    },
});

export const productFilter = {
    filter,
    choice,
    product,
}
