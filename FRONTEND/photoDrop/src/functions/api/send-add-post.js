import { getToken } from "../utils/get-token";

export async function sendAddPost(data) {

    const requestInit = {
        method: "post",
        headers: {},
        body: data,
    };

    const token = getToken();
    if (token) {
        requestInit.headers["authorization"] = token;
    }

    const response = await fetch(`http://localhost:5000/posts`, requestInit);

    const result = await response.json();

    if (!result.success) {
        console.log(result.error);
    }
}
