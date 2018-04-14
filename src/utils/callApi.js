import fetch from 'isomorphic-fetch';

export const origin = 'localhost:8000';
const { protocol } = window.location;
// const origin = 'https://dogecodes-chat-api.herokuapp.com';

export default function callApi(endpoint, token, options = {}, payload) {
  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};

  return fetch(`${protocol}//${origin}/v1${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(payload),
    ...options,
  })
    .then(resp => resp.json())
    .then((json) => {
      if (json.success) return json;
      throw new Error(json.message);
    });
}
