import { fetchAPI } from "./fetch-api.js";

export async function sendValidationCode(payload) {
  return await fetchAPI("/users/validate-email", "post", payload);
}