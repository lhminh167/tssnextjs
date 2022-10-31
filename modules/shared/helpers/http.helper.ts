import { getEnvVar } from "../crud/crud.service";

export function setContentType(options: RequestInit, contentType: string) {
  if (contentType) options.headers["Content-Type"] = contentType;
}

export function getImageUrl(
  imageName: string = "",
  imageUrl: string = "",
  cloudName: string = getEnvVar("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME")
): string {
  const name = imageName ? imageName.replace(/\.[^/.]+$/, "") : "placeholder";
  let url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,w_auto,c_scale,q_auto,dpr_auto/tss/${name}`;
  if (imageUrl) url = imageUrl;
  return url;
}

export const revalidateInterval: number = 1;

export function isOk(responseStatus: number) {
  return responseStatus < 300;
}
