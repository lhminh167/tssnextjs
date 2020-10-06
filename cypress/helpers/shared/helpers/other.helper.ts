export function getLastIndex(input: any[]) {
    return input.length - 1;
}

export function getMiddleIndex(input: any[]) {
    return Math.floor(input.length / 2);
}

export function getRandomIndex(input: any[]) {
    return Math.floor(Math.random() * input.length);
}

export function getRandomEl(input: any[]) {
    return input[getLastIndex(input)];
}

export function getMiddleEl(input: any[]) {
    const res: any = input[Math.floor(input.length / 2)];
    return res;
}