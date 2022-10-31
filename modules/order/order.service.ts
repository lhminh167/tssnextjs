import { post, put, get } from '../shared/crud/crud.service';
import { apiOrderUrl, Order } from './order.model';
import { OrderCreateForm, OrderCreateRequest, OrderCreateResponse } from './create/create-order.model';
import { IResponse, PaginationRequest } from '../shared/crud/crud.model';

export async function getOrderCreateForm(): Promise<IResponse<OrderCreateForm>> {
  return await get(apiOrderUrl.new, 0);
}

export async function createPayment(input: OrderCreateRequest): Promise<IResponse<OrderCreateResponse>> {
  return await post(apiOrderUrl.payment, input);
}

export async function createOrder(input: OrderCreateRequest) {
  return await post(apiOrderUrl.baseUrl, input);
}

export async function getOrders(input: PaginationRequest) {
  return await get(apiOrderUrl.search(input));
}

export async function getOrder(orderId: number): Promise<IResponse<Order>> {
  return await get(apiOrderUrl.baseUrl, orderId);
}

export async function stockOk(orderId: number) {
  return await put(apiOrderUrl.stockOk, orderId, null);
}

export async function stockNotOk(orderId: number, input: string) {
  return await put(apiOrderUrl.stockNotOk, orderId, input);
}

export async function shipOk(orderId: number) {
  return await put(apiOrderUrl.shipOk, orderId, null);
}

export async function shipNotOk(orderId: number, input: string) {
  return await put(apiOrderUrl.shipNotOk, orderId, input);
}