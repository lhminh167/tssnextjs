import { Shipping, defaultShipping } from '../shared/models/shipping.model';
import { Customer, defaultCustomer } from '../customer/customer.model';
import { Tax, defaultTax } from '../shared/models/tax.model';
import { IProduct } from '../shared/models/product.model';

const orderBaseUrl = 'Order';

export const orderUrl = {
    baseUrl: orderBaseUrl,
    new: orderBaseUrl + '/new',
    stockOk: orderBaseUrl + '/stockOk',
    stockNotOk: orderBaseUrl + '/stockNotOk',
    shipOk: orderBaseUrl + '/shipOk',
    shipNotOk: orderBaseUrl + '/shipNotOk'
};

export interface Order {
    orderId: number;
    totalAmount: number;
    createdOn: string;
    shippedOn: string;
    comments: string;
    customer: Customer;
    shipping: Shipping;
    tax: Tax;
    audit: Audit[];
    orderDetail: OrderDetail[];
    orderStatus: OrderStatus;
}

export interface OrderStatus {
    id: number;
    message: string;
    cssClass: string;
}

export interface OrderDetail {
    itemId: number;
    orderId: number;
    productId: number;
    attributes: string;
    productName: string;
    quantity: number;
    unitCost: number;
    product: IProduct;
}

export interface Audit {
    auditId: number;
    orderId: number;
    createdOn: string;
    message: string;
    code: number;
}

export const defaultOrderStatus: OrderStatus = {
    id: 0,
    message: '',
    cssClass: ''
};

export const defaultOrder: Order = {
    orderId: 0,
    totalAmount: 0,
    createdOn: '',
    shippedOn: '',
    comments: '',
    customer: defaultCustomer,
    shipping: defaultShipping,
    tax: defaultTax,
    audit: [],
    orderDetail: [],
    orderStatus: defaultOrderStatus,
};
