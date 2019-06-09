import { combineReducers } from 'redux';
import {productReducer} from '../product/product.redux';
import { loaderReducer } from '../loader/loader.redux';
import { notifierReducer } from '../notifier/notifier.redux';
import { productFilterReducer } from '../product.filter/product.filter.redux';

export const rootReducer = combineReducers({
  product: productReducer,
  isLoading: loaderReducer,
  notifier: notifierReducer,
  productFilter: productFilterReducer
})
