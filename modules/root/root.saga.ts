import { all } from 'redux-saga/effects';
import { customerWatchers } from '../customer/customer.saga';
import { productFilterWatchers } from '../product/filter/product-filter.saga';
import { shoppingCartWatchers } from '../shopping-cart/shopping-cart.saga';
import wishListSaga from '../wish-list/wish-list.saga';

function* rootSaga() {
    yield all([
        ...productFilterWatchers,
        ...customerWatchers,
        ...shoppingCartWatchers,
        ...wishListSaga
    ])
}

export default rootSaga