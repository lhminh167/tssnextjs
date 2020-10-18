import { IResponse } from "../../../../modules/shared/crud/crud.model";

export async function postTest(url: string, body: any) {
}

export function testApiResponse(input: IResponse<any>, condition: IResponse<any>) {
    expect(input.status, 'response status').to.eq(condition.status);
    expect(input.title, 'response title').to.eq(condition.title);
    if (condition.errors) expect(input.errors, 'response errors').to.be.deep.eq(condition.errors);
    if (condition.content) expect(input.content, 'response content').not.be.undefined;
    return input;
}
