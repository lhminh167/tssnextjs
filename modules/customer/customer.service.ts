import { get, post, put, remove } from '../shared/crud/crud.service';
import { Customer, ILoginResquest, customerUrl } from './customer.model';
import { getCustomerId } from '../shared/helpers/auth.helper';

export async function getCustomers() {
    return await get(customerUrl.baseUrl, 0);
}

export async function getCustomer(customerId: number) {
    return await get(customerUrl.baseUrl, customerId);
}

export async function createCustomer(input: Customer) {
    return await post(customerUrl.baseUrl, input);
}

export async function login(input: ILoginResquest) {
    return await post(customerUrl.login, input);
}

export async function updateCustomer(input: Customer) {
    return await put(customerUrl.baseUrl, getCustomerId(input.customerId), input);
}

export async function removeCustomer(input: Customer) {
    return await remove(customerUrl.baseUrl, 0, input.customerId);
}
