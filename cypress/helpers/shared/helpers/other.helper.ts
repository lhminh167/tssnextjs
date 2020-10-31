export function getLastIndex(input: any[]) {
    return input.length - 1;
}

export function getLastEl(input: any[]) {
    return input[getLastIndex(input)];
}

export function getMiddleIndex(input: any[]) {
    return Math.floor(input.length / 2);
}

export function getRandomIndex(input: any[]) {
    return Math.floor(Math.random() * input.length);
}

export function getFirstEl(input: any[]) {
    return input[0];
}

export function getRandomEl(input: any[]) {
    return input[getRandomIndex(input)];
}

export function getRandomDomEl(input: JQuery) {
    return getRandomEl(input.toArray());
}

export function getMiddleEl(input: any[]) {
    const res: any = input[Math.floor(input.length / 2)];
    return res;
}

export const cyItWithConfig = (
    title: string,
    config: Cypress.TestConfigOverrides,
    fn?: Mocha.Func
) => {
    if (!Cypress.env('tags')) return it(title, config, fn);

    const tags: string[] = Cypress.env('tags').split(',');
    const isFound = tags.some((tag) => title.includes(tag));
    if (isFound) return it(title, config, fn);
};

export const cyIt = (title: string, fn?: Mocha.Func) => {
    console.log(Cypress.env('tags'))
    if (Cypress.env('tags')) {
        const tags: string[] = Cypress.env('tags').split(',');
        const isFound = tags.some((tag) => title.includes(tag));
        if (!isFound) return;
    }

    it(title, fn);
}
