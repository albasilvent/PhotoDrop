import { getToken } from "../utils/get-token.js";

const host = import.meta.env.VITE_API_HOST;

export async function fetchAPI(path, method, payload) {
  method = method ?? "get";

  const requestInit = {
    method: method,
    headers: {},
  };

  const token = getToken();
  if (token) {
    requestInit.headers["authorization"] = token;
  }

  if (method === "get" && payload) {
    const query = new URLSearchParams(payload).toString();
    path += `?${query}`;
  }

  if (method !== "get" && method !== "delete" && payload) {
    requestInit.headers["Content-Type"] = "application/json";
    requestInit.body = JSON.stringify(payload);
  }

  const response = await fetch(host + path, requestInit);

  const result = await response.json();

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}