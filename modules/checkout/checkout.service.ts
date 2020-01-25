import { DeliveryForm, orderUrl } from "./checkout.model";
import { post, put } from "../shared/crud/crud.service";

export async function createOrder(input: DeliveryForm) {
  return await post(orderUrl.baseUrl, input);
}

export async function stockOk(orderId: number) {
  return await put(orderUrl.stockOk, orderId, null);
}

export async function shipOk(orderId: number) {
  return await put(orderUrl.shipOk, orderId, null);
}
