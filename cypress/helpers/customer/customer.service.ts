import { apiCustomerBaseUrl, apiCustomerUrl } from "../../../modules/customer/customer.model";
import { get } from "../../../modules/shared/crud/crud.service";

export async function getResetPasswordToken(customerId: number) {
    return await get(`${apiCustomerBaseUrl}/${customerId}/ResetPassword`, 0);
}

