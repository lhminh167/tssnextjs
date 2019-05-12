import { combineReducers } from 'redux';
import {productReducer} from '../product/product.reducer';

export const rootReducer = combineReducers({
  product: productReducer,
})
