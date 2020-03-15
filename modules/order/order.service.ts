import { post, put, get } from "../shared/crud/crud.service";
import { orderUrl } from "./order.model";
import { OrderCreateRequest } from "./create/create-order.model";

export async function getOrderCreateForm() {
  return await get(orderUrl.new, 0);
}

export async function createOrder(input: OrderCreateRequest) {
  return await post(orderUrl.baseUrl, input);
}

export async function getOrders() {
  return await get(orderUrl.baseUrl, 0);
}

export async function getOrder(orderId: number) {
  return await get(orderUrl.baseUrl, orderId);
}

export async function stockOk(orderId: number) {
  return await put(orderUrl.stockOk, orderId, null);
}

export async function stockNotOk(orderId: number) {
  return await put(orderUrl.stockNotOk, orderId, null);
}

export async function shipOk(orderId: number) {
  return await put(orderUrl.shipOk, orderId, null);
}
