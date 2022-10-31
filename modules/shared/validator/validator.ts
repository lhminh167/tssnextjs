import { ValueValidationResult } from "fluentvalidation-ts/dist/ValueValidationResult";

export function isValidForm(form: any): boolean {
  return Object.entries(form).length === 0 && form.constructor === Object;
}

export function beRequired(fieldName?: string) {
  const rule = {
    predicate: (value: string) => (value ? true : false),
    message: `${fieldName ?? "This field"} is required`,
  };
  return rule;
}

export function isValidField(
  input: ValueValidationResult<any> | undefined,
  submitted: boolean
) {
  return input?.length && input.length > 0 && submitted ? false : true;
}
