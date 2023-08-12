import { getToken } from "../utils/get-token";

export async function sendPost(data) {
    const requestInit = {
        method: "post",
        headers: {},
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }
    requestInit.body = data;

    const response = await fetch(`http://localhost:5000/posts`, requestInit);

    const result = await response.json();

    if (!result.success) {
        throw result.error;
    }
}
