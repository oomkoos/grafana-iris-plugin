import { isEmpty } from 'lodash';
import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceOptions } from 'types/DataSourceOptions';
import { store } from 'utils/response.store';

export async function fetchResource(url?: URL, settings?: DataSourceInstanceSettings<DataSourceOptions>, body = {}) {
  if (!url || !settings) {
    return;
  }

  const { username, password } = settings.jsonData;
  const basicEncodedSting = btoa(`${username}:${password}`);

  // TODO workaround: CORS proxy to get around 'No Access-Control-Allow-Origin header' problems
  const proxyUrl = 'https://radiant-hamlet-69471.herokuapp.com/';

  let headers = new Headers();
  headers.append('Authorization', `Basic ${basicEncodedSting}`);
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const init: RequestInit = {
    method: isEmpty(body) ? 'GET' : 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  const responseRaw = await fetch(proxyUrl + url, init);

  const response = await responseRaw.json();
  if (response) {
    store.set('Response', response);
  }

  return response;
}
