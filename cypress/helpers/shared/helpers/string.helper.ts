import { toNumber } from "../../../../modules/shared/helpers/auth.helper";

export function getRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.toLowerCase();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomInteger(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandomNumbers(length: number) {
    let result = '';
    const characters = '0123456789'.toLowerCase();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function unformatCurrency(input: string): number {
    return toNumber(input.replace(/[^0-9.-]+/g, ""));
}

