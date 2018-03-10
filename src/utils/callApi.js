import fetch from "isomorphic-fetch";

export default function callApi(endpoint, token, options, payload) {
  const authHeaders = token ? {
      'Authorization': `Bearer ${token}`
    }
    : {};

  return fetch(`http://localhost:8000/v1${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(payload),
    ...options
  })
    .then(resp => resp.json())
    .then(json => {
      if (json.success) return json;
      throw new Error(json.message);
    })
}
