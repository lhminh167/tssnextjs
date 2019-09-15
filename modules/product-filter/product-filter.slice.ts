import { createSlice } from 'redux-starter-kit';
import { IAction, IState } from '../shared/crud/crud.model';
import { succeeded, failed, idle, pending } from '../shared/crud/crud.reducer';
import { crudInitialState } from '../shared/crud/crud.state';
import { IProductFilterChoice, IProductFilterFilter, IProductFilterProduct, productFilterUrl } from './product-filter.model';

const filterInitialData: IProductFilterFilter = {
    attributes: [],
    categories: [],
};

const filterInitialState: IState<IProductFilterFilter> = crudInitialState(filterInitialData);

const choiceInitialState: IProductFilterChoice = {
    colorId: 0,
    sizeId: 0,
    categoryIds: [],
    priceRange: {
        minPrice: null,
        maxPrice: null,
    }
};

const productInitialData: IProductFilterProduct[] = [];

const productInitialState: IState<IProductFilterProduct[]> = crudInitialState(productInitialData);

// productInitialData

const filter = createSlice({
    slice: productFilterUrl.filter,
    initialState: filterInitialState,
    reducers: {
        getPending: (state: IState<IProductFilterFilter>, action: IAction<IProductFilterFilter>) => {
            pending(state);
        },
        getSucceeded: (state: IState<IProductFilterFilter>, action: IAction<IProductFilterFilter>) => {
            state.data = action.payload.content;
            succeeded(state);
        },
        getFailed: (state: IState<IProductFilterFilter>, action: IAction<IProductFilterFilter>) => {
            failed(state, action);
        },
        getIdle: (state: IState<IProductFilterFilter>, action: IAction<IProductFilterFilter>) => {
            idle(state, filterInitialState);
        },
    }
});

const product = createSlice({
    slice: productFilterUrl.product,
    initialState: productInitialState,
    reducers: {
        getPending: (state: IState<IProductFilterProduct[]>, action: IAction<IProductFilterProduct[]>) => {
            pending(state);
        },
        getSucceeded: (state: IState<IProductFilterProduct[]>, action: IAction<IProductFilterProduct[]>) => {
            state.data = action.payload.content;
            succeeded(state);
        },
        getFailed: (state: IState<IProductFilterProduct[]>, action: IAction<IProductFilterProduct[]>) => {
            failed(state, action);
        },
        getIdle: (state: IState<IProductFilterProduct[]>, action: IAction<IProductFilterProduct[]>) => {
            idle(state, productInitialState);
        },
    }
});

const choice = createSlice({
    slice: productFilterUrl.choice,
    initialState: choiceInitialState,
    reducers: {
        apply: (state: IProductFilterChoice, action: IAction<IProductFilterChoice>) => {
            state = action.payload.content;
        },
    },
});

export const productFilter = {
    filter,
    choice,
    product,
}
