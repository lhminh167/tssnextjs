import { createSlice } from 'redux-starter-kit';
import { crudSlice } from "../shared/crud/crud.slice";
import { crudWatcher } from "../shared/crud/crud.watcher";
import { IProductFilterChoice, IProductFilterFilter, productFilterUrl } from './product-filter.model';

const filterInitialState: IProductFilterFilter = {
    colors: [],
    sizes: [],
    categories: [],
};

const choiceInitialState: IProductFilterChoice = {
    colorId: 0,
    sizeId: 0,
    categoryIds: [],
    priceRange: {
        minPrice: null,
        maxPrice: null,
    }
};

const filter = crudSlice(
    productFilterUrl.filter,
    filterInitialState,
);

const filterWatcher = crudWatcher(filter);

const product = crudSlice(
    productFilterUrl.product,
    choiceInitialState
);

const productWatcher = crudWatcher(product);

const choice = createSlice({
    slice: productFilterUrl.choice,
    initialState: choiceInitialState,
    reducers: {
        apply: (state: IProductFilterChoice) => {
            state = state;
        },
    },

})

export const productFilter = {
    filter,
    filterWatcher,
    choice,
    choiceInitialState,
    product,
    productWatcher
}

