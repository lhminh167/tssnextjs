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

export function shouldRunThisTest(title: string) {
    if (!Cypress.env('tags')) return true;

    const tags: string[] = Cypress.env('tags').split(',');
    const isFound = tags.some((tag) => title.includes(tag));
    return isFound;
}

export const cyIt = {
    run: (title: string, fn?: Mocha.Func) => shouldRunThisTest(title) ? it(title, fn) : null,
    skip: (title: string, fn?: Mocha.Func) => shouldRunThisTest(title) ? it.skip(title, fn) : null,
    only: (title: string, fn?: Mocha.Func) => shouldRunThisTest(title) ? it.only(title, fn) : null,
}


export const cyItWithConfig = {
    run: (title: string,config: Cypress.TestConfigOverrides,fn?: Mocha.Func) => shouldRunThisTest(title) ? it(title, config, fn) : null,
    skip: (title: string,config: Cypress.TestConfigOverrides,fn?: Mocha.Func) => shouldRunThisTest(title) ? it.skip(title, config, fn) : null,
    only: (title: string,config: Cypress.TestConfigOverrides,fn?: Mocha.Func) => shouldRunThisTest(title) ? it.only(title, config, fn) : null,
}
