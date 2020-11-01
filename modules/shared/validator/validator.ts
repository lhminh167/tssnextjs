export function isValidForm(form: any): boolean {
    return Object.entries(form).length === 0 && form.constructor === Object;
}

export function beRequired(fieldName?: string) {
    const rule = {
        predicate: (value: string) => value ? true : false,
        message: `${fieldName ?? 'This field'} is required`,
    }
    return rule;
}