import es6promise from "es6-promise";
import {
  HttpMethod,
  ImageGetUploadTokensRequest,
  IResponse,
  mediaUrl,
  UploadRequest,
} from "../crud/crud.model";
import { setContentType } from "../helpers/http.helper";
import { setTokenHeader } from "../helpers/token.helper";

es6promise.polyfill();

const baseUrl = getEnvVar("NEXT_PUBLIC_API_URL");
const uploadUrl = `https://api.cloudinary.com/v1_1/${getEnvVar(
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
)}/image/upload`;

export async function get(url: string, id: number = 0) {
  return await callApi(getUrl(url, id));
}

export async function post(url: string, body: any) {
  return await callApi(getUrl(url), {
    method: HttpMethod.POST,
    body: JSON.stringify(body),
  });
}

export async function put(url: string, id: number = 0, body: any) {
  return await callApi(getUrl(url, id), {
    method: HttpMethod.PUT,
    body: JSON.stringify(body),
  });
}

export async function remove(url: string, id: number = 0, body: any) {
  return await callApi(getUrl(url, id), {
    method: HttpMethod.DELETE,
    body: JSON.stringify(body),
  });
}

export async function callApi(url: string, options: RequestInit = {}) {
  options.headers = {};
  setTokenHeader(options);
  setContentType(options, "application/json");

  const response = await fetch(url, options);
  const json = response
    .json()
    .then((res) => res)
    .catch(
      (err) =>
        ({
          content: null,
          status: response.status,
          title: response.statusText,
        } as IResponse<any>)
    );

  return await json;
}

async function getImageUploadAuthToken(input: ImageGetUploadTokensRequest) {
  return await post(mediaUrl.imageUploadToken, input);
}

export async function upload(input: UploadRequest[]) {
  const tokenResponse = await getImageUploadAuthToken({
    content: input.map((entry) => ({
      name: entry.name,
      settings: "f_auto,w_auto,c_scale,q_auto,dpr_auto",
    })),
  });

  const requests = input.map((entry, index) => {
    const body = new FormData();
    body.append("PUBLIC_KEY", getEnvVar("NEXT_PUBLIC_CLOUDINARY_PUBLIC_KEY"));
    body.append("upload_preset", "tss");
    body.append("file", entry.file);
    body.append("public_id", entry.name);
    body.append("signature", tokenResponse.content[index].uploadToken);
    body.append("timestamp", tokenResponse.content[index].creationTime);
    body.append("eager", "f_auto,w_auto,c_scale,q_auto,dpr_auto");

    const options = {
      method: HttpMethod.POST,
      body,
    };
    return fetch(uploadUrl, options);
  });

  return Promise.all(requests);
}

export function getUrl(url: string, id: number = 0): string {
  url = `${baseUrl}${url}`;
  url += id > 0 ? `/${id}` : "";
  return url;
}

export function getEnvVar(key: string) {
  //@ts-ignore
  // if (typeof window !== "undefined" && window.Cypress)
  //   return Cypress.env(key);

  const config = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_CLOUDINARY_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC_KEY,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    ENV: process.env.NODE_ENV,
    IS_LOCAL: process.env.IS_LOCAL,
  };

  return config[key];
}
