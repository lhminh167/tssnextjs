/* global fetch */
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';
import { HttpMethod } from '../crud/crud.model';

es6promise.polyfill()

// const baseUrl = `https://localhost:5001${path}`;

// if (process.env.NODE_ENV === 'production')
const baseUrl = 'https://tssnetcore.herokuapp.com/api';

export async function get(url: string) {

    url = `${baseUrl}${url}`;

    return await callApi(url);
}

export async function getById(url: string, id: number) {

    url = `${baseUrl}${url}/${id}`;

    return await callApi(url);
}

export async function post(url: string, body) {

    url = `${baseUrl}${url}`;

    return await callApi(url, {
        method: HttpMethod.POST,
        body: JSON.stringify(body)
    });
}

export async function update(url: string, id: number, body) {

    url = `${baseUrl}${url}/${id}`;

    return await callApi(url, {
        method: HttpMethod.PUT,
        body: JSON.stringify(body)
    });
}

export async function remove(url: string, id: number, body) {

    url = `${baseUrl}${url}/${id}`;

    return await callApi(url, {
        method: HttpMethod.DELETE,
        body: JSON.stringify(body)
    });
}

function callApi(url: string, options?: RequestInit) {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json-patch+json',
        },
    }).then(response =>
        response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
        return response.ok ? json : Promise.reject(json);
    })
    .then(
        response => ({ response }),
        error => ({ error })
    )
}