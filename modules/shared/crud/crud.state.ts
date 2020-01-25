export const crudInitialState = (initialData: any = []) => ({
    data: initialData,
    error: null,
    isLoading: false,
});