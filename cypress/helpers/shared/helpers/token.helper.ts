
export interface ITokenPayload {
    nameid: string,
    unique_name: string,
    role: string,
    nbf: Date,
    exp: Date,
    iat: Date
}
