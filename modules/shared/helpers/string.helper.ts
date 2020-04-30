export function toUrl(string: string) {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
}

export function isEmptyString(input: string) {
    return input === null || input === '';
}

const locale = 'en-US';

const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export function formatCurrency(input: number): string {
    return locale.slice(-2) + ' ' + currencyFormatter.format(input); // "US $1,000.00"
}

export function formatDatetime(input: string): string {
    return input ? new Date(input).toLocaleString() : null;
}

export function formatPercent(number: number, total: number): string {
    return Math.round(number * 100 / total).toFixed(0) + '%';
}