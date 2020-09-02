import es6promise from 'es6-promise';
import {
  HttpMethod,

  ImageGetUploadTokensRequest,
  mediaUrl,
  Response as TssResponse, UploadRequest
} from '../crud/crud.model';
import { setContentType } from '../helpers/http.helper';
import { setTokenHeader } from '../helpers/token.helper';

es6promise.polyfill();

const baseUrl = getEnvVar('API_URL');
const uploadUrl = `https://api.cloudinary.com/v1_1/${
  getEnvVar('CLOUDINARY_CLOUD_NAME')
  }/image/upload`;

export async function get(url: string, id: number = 0) {
  return await callApi(getUrl(url, id));
}

export async function post(url: string, body: any) {
  return await callApi(getUrl(url), {
    method: HttpMethod.POST,
    body: JSON.stringify(body)
  });
}

export async function put(url: string, id: number = 0, body: any) {
  return await callApi(getUrl(url, id), {
    method: HttpMethod.PUT,
    body: JSON.stringify(body)
  });
}

export async function remove(url: string, id: number = 0, body: any) {
  return await callApi(getUrl(url, id), {
    method: HttpMethod.DELETE,
    body: JSON.stringify(body)
  });
}

export async function callApi(url: string, options: RequestInit = {}) {
  options.headers = {};
  setTokenHeader(options);
  setContentType(options, 'application/json');

  const response = await fetch(url, options);
  const json = response
    .json()
    .then(res => res)
    .catch(
      err =>
        new TssResponse(
          null,
          response.status,
          response.statusText
        )
    );

  return await json;
}

async function getImageUploadAuthToken(input: ImageGetUploadTokensRequest) {
  return await post(mediaUrl.imageUploadToken, input);
}

export async function upload(input: UploadRequest[]) {
  const tokenResponse = await getImageUploadAuthToken({
    content: input.map(entry => ({
      name: entry.name,
      settings: 'f_auto,w_auto,c_scale,q_auto,dpr_auto'
    }))
  });

  const requests = input.map((entry, index) => {
    const body = new FormData();
    body.append('api_key', getEnvVar('CLOUDINARY_API_KEY'));
    body.append('upload_preset', 'tss');
    body.append('file', entry.file);
    body.append('public_id', entry.name);
    body.append('signature', tokenResponse.content[index].uploadToken);
    body.append('timestamp', tokenResponse.content[index].creationTime);
    body.append('eager', 'f_auto,w_auto,c_scale,q_auto,dpr_auto');

    const options = {
      method: HttpMethod.POST,
      body
    };
    return fetch(uploadUrl, options);
  });

  return Promise.all(requests);
}

export function getUrl(url: string, id: number = 0): string {
  url = `${baseUrl}${url}`;
  url += id > 0 ? `/${id}` : '';
  return url;
}

export function getEnvVar(key: string) {
  //@ts-ignore
  if (typeof window !== "undefined" && window.Cypress)
    return Cypress.env(key);


  const config = {
    API_URL: process.env.API_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    SITE_URL: process.env.SITE_URL,
    SITE_NAME: process.env.SITE_NAME,
    ENV: process.env.NODE_ENV,
  }

  return config[key]
}