export function toUrl(string: string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
}

export function isEmptyString(input: string) {
    return input === null || input === '';
}

const locale = 'en-US';

const crrencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export function formatCurrency(input: number) {
    return crrencyFormatter.format(input); // "$1,000.00"
}

export function formatDatetime(input: string) {
    return input ? new Date(input).toLocaleString() : null;
}