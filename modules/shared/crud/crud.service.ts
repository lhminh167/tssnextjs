import es6promise from "es6-promise";
import "isomorphic-unfetch";
import { HttpMethod } from "../crud/crud.model";
import { setTokenHeader } from "../helpers/token.helper";
import { setContentType } from "../helpers/http.helper";

es6promise.polyfill();

// const baseUrl = process.env.API_URL;

// if (process.env.NODE_ENV === 'production')
const baseUrl = 'https://tssnetcore.herokuapp.com/api/';

export async function get(url: string, id: number) {
  url = `${baseUrl}${url}`;

  url += id > 0 ? `/${id}` : "";

  return await callApi(url);
}

export async function post(url: string, body: any) {
  url = `${baseUrl}${url}`;

  return await callApi(url, {
    method: HttpMethod.POST,
    body: JSON.stringify(body)
  });
}

export async function put(url: string, id: number, body: any) {
  url = `${baseUrl}${url}`;

  url += id > 0 ? `/${id}` : "";

  return await callApi(url, {
    method: HttpMethod.PUT,
    body: JSON.stringify(body)
  });
}

export async function remove(url: string, id: number, body: any) {
  url = `${baseUrl}${url}`;

  url += id > 0 ? `/${id}` : "";

  return await callApi(url, {
    method: HttpMethod.DELETE,
    body: JSON.stringify(body)
  });
}

async function callApi(url: string, options: RequestInit = {}) {
  options.headers = {};
  setTokenHeader(options);
  setContentType(options, "application/json");

  const response = await fetch(url, options);
  return await response.json();
}
