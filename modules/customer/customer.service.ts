import { IResponse } from '../shared/crud/crud.model';
import { get, post, put, remove } from '../shared/crud/crud.service';
import { Customer, CustomerUpdatePasswordRequest, CustomerUpdateRequest, apiCustomerUrl, ILoginRequest, CustomerForgotPasswordRequest, CustomerPasswordResetRequest, CustomerPasswordResetTokenValidationRequest, ILoginResponse } from './customer.model';

export async function getCustomers() {
    return await get(apiCustomerUrl.baseUrl, 0);
}

export async function getCustomer(customerId: number) {
    return await get(apiCustomerUrl.baseUrl, customerId);
}

export async function createCustomer(input: Customer): Promise<IResponse<ILoginResponse>> {
    return await post(apiCustomerUrl.baseUrl, input);
}

export async function login(input: ILoginRequest) {
    return await post(apiCustomerUrl.login, input);
}

export async function updateCustomer(input: CustomerUpdateRequest) {
    return await put(apiCustomerUrl.baseUrl, input.customerId, input);
}

export async function removeCustomer(input: Customer) {
    return await remove(apiCustomerUrl.baseUrl, 0, input.customerId);
}

export async function updatePassword(input: CustomerUpdatePasswordRequest) {
    return await put(apiCustomerUrl.updatePassword(input.customerId), 0, input);
}

export async function forgotPassword(input: CustomerForgotPasswordRequest) {
    return await put(apiCustomerUrl.forgotPassword, 0, input);
}

export async function validateResetPasswordToken(input: CustomerPasswordResetTokenValidationRequest) {
    return await get(apiCustomerUrl.resetPassword(input.customerId, input.resetPasswordToken), 0);
}

export async function resetPassword(input: CustomerPasswordResetRequest) {
    return await put(apiCustomerUrl.resetPassword(input.customerId, input.resetPasswordToken), 0, input);
}