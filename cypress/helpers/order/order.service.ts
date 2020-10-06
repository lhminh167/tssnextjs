import { post, put, get } from '../shared/crud/crud.service';
import { apiOrderUrl } from './order.model';
import { OrderCreateRequest } from './create/create-order.model';
import { OrderUpdateRequest } from './detail/order-detail.model';

export async function getOrderCreateForm() {
  return await get(apiOrderUrl.new, 0);
}

export async function createOrder(input: OrderCreateRequest) {
  return await post(apiOrderUrl.baseUrl, input);
}

export async function getOrders() {
  return await get(apiOrderUrl.baseUrl, 0);
}

export async function getOrder(orderId: number) {
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