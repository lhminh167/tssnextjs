import { IResponse } from "../../../../modules/shared/crud/crud.model";

export function logApi(input: IResponse<any>) {
    let errors = input?.errors?.reduce((result, entry) => result += ` Error: ${entry}.`) ?? '';
    return cy
        .log(`Response status: ${input.status}. Title: ${input.title} Detail: ${input.detail}${errors}.`)
        .wrap(input)
}
