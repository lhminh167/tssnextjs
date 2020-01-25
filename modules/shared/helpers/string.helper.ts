export function getUrlFromString(string: string) {
    return string.replace(/\s+/g, '-').toLowerCase();
}

export function isEmptyString(text: string) {
    return text === null || text === '';
}