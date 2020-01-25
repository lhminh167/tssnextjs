export function setContentType(options: RequestInit, contentType: string) {
    if (contentType) options.headers["Content-Type"] = contentType;
}
