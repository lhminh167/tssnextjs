import fetch from 'isomorphic-unfetch'
import os from 'os';

/**
 *
 * Usage: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * @export
 * @param {{ data?: any; path?: string; method?: string; }} [{ data = {}, path = '', method = 'POST' }={}]
 * @returns
 */
export function apiCall({ method = 'POST', path = '', data = {}, }: { data?: any; path?: string; method?: string; } = {}) {

    let url = `https://localhost:5001${path}`;

    if (process.env.NODE_ENV === 'production')
        url = `https://tssnetcore.herokuapp.com${path}`;
    
    return fetch(url);
}