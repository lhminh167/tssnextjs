
export function setContentType(options: RequestInit, contentType: string) {
    if (contentType) options.headers["Content-Type"] = contentType;
}

export function getImageUrl(
    imageName: string = null,
    imageUrl: string = null,
    cloudName: string = process.env.CLOUDINARY_CLOUD_NAME
): string {
    return imageUrl ??
        "https://res.cloudinary.com/" +
        cloudName +
        "/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/" +
        (imageName ? imageName.replace(/\.[^/.]+$/, "") : "placeholder");
}
