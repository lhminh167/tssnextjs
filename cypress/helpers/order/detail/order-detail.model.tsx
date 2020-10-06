export interface OrderUpdateRequest {
    comments?: string;
}

export const defaultOrderCreateForm: OrderUpdateRequest = {
    comments: null,
}
