import { getTokenInfo } from "./get-token-info.js";

export function saveToken(token) {
  const userData = getTokenInfo(token);

  localStorage.setItem("USER_TOKEN_PHOTODROP", token);
  localStorage.setItem("USER_PHOTODROP", JSON.stringify(userData));
}

