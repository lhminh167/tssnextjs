export interface INotifierState {
    notifications: Notification[],
}

export interface Notification{
    key: string,
    message: string,
    options: any,
}