import { Customer, defaultCustomer } from "../customer/customer.model";
import { Shipping, defaultShipping } from "../shared/models/shipping.model";
import { Tax, defaultTax } from "../shared/models/tax.model";
import { IProduct } from "../shared/models/product.model";
import { PaginationRequest } from "../shared/crud/crud.model";
import queryString from 'query-string';

const apiOrderBaseUrl = 'Order';

export const apiOrderUrl = {
    baseUrl: apiOrderBaseUrl,
    new: apiOrderBaseUrl + '/new',
    payment: apiOrderBaseUrl + '/payment',
    stockOk: apiOrderBaseUrl + '/stockOk',
    stockNotOk: apiOrderBaseUrl + '/stockNotOk',
    shipOk: apiOrderBaseUrl + '/shipOk',
    shipNotOk: apiOrderBaseUrl + '/shipNotOk',
    search: (query: PaginationRequest) => `${apiOrderBaseUrl}?${queryString.stringify(query)}`,
    detail: (orderId: number) => ({
        href: `${apiOrderBaseUrl}/[orderId]`,
        as: `${apiOrderBaseUrl}/${orderId}`,
    }),
};

const orderBaseUrl = '/order';

export const orderUrl = {
    baseUrl: orderBaseUrl,
    new: orderBaseUrl + '/new',
    detail: (orderId: number) => ({
        href: `${orderBaseUrl}/[orderId]`,
        as: `${orderBaseUrl}/${orderId}`,
    }),
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
