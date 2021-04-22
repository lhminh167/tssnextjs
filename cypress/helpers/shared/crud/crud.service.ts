import { IResponse } from "../../../../modules/shared/crud/crud.model";

export function logApi(input: IResponse<any>) {
    return cy
        .log(`Response status: ${input.status}. Title: ${input.title} Detail: ${input.detail} Errors: ${JSON.stringify(input.errors)}.`)
        .wrap(input)
}
