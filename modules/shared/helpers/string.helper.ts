

export function toUrl(input: string) {
    return input.trim().replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
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

const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    second: undefined,
    minute: 'numeric',
    hour: 'numeric',
};

const dateTimeFormatter = new Intl.DateTimeFormat(locale, dateTimeOptions);

export function formatCurrency(input: number): string {
    return locale.slice(-2) + ' ' + currencyFormatter.format(input); // 'US $1,000.00'
}

export function formatDatetime(input: string): string {
    return input ? dateTimeFormatter.format(new Date(input)) : null;
}

export function formatPercent(number: number, total: number): string {
    return Math.round(number * 100 / total).toFixed(0) + '%';
}

export const phoneNumberRegex = RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$');

export const postalCodeRegex = RegExp('10[0-9]{2}');

export function removeTrailingDot(input: string) {
    return input.replace(/\.$/, "");
}

export function getUserAvatar(input: string) {
    return input[0];
}