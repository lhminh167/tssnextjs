export function isValidForm(form: any): boolean {
    return Object.entries(form).length === 0 && form.constructor === Object;
}