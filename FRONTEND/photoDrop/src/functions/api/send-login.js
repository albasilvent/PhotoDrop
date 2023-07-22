import { getToken } from "../utils/get-token";

export async function sendLogin(payload) {
    const requestInit = {
        method: "post",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }
    requestInit.headers["Content-Type"] = "application/json";
    requestInit.body = JSON.stringify(payload);

    const response = await fetch("http://localhost:5000/users/login" , requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }

    return result.data;
}
